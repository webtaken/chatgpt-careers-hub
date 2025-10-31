import logging
import re
from collections import defaultdict, deque
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Set, Tuple, Union

from django.db import transaction
from jobs.models import Job, Tag
from rapidfuzz import fuzz

logger = logging.getLogger(__name__)


@dataclass
class MergeReport:
    canonical_tag_id: int
    canonical_tag_name: str
    merged_tag_ids: List[int]
    merged_tag_names: List[str]
    jobs_relinked_count: int


@dataclass
class ClusterReport:
    canonical_tag_id: Optional[int]
    canonical_tag_name: str
    cluster_size: int
    merged_count: int
    jobs_relinked_count: int


NORMALIZE_SPACE_REGEX = re.compile(r"\s+")
PUNCT_REGEX = re.compile(r"[\.,;:'\"`~!@#$%^&*()\[\]{}<>?/\\|+=-]")


def normalize_token(name: str) -> str:
    if not name:
        return ""
    lowered = name.strip().lower()
    lowered = lowered.replace("_", " ").replace("-", " ")
    lowered = PUNCT_REGEX.sub(" ", lowered)
    lowered = NORMALIZE_SPACE_REGEX.sub(" ", lowered)
    return lowered.strip()


def score_similarity(a: str, b: str) -> float:
    return float(fuzz.token_set_ratio(a, b))


def _build_similarity_graph(tags: List[Tag], threshold: int) -> Dict[int, Set[int]]:
    normalized: List[Tuple[int, str]] = [(t.id, normalize_token(t.text)) for t in tags]
    norm_bucket: Dict[str, List[int]] = defaultdict(list)
    for tag_id, norm in normalized:
        if norm:
            norm_bucket[norm].append(tag_id)

    adjacency: Dict[int, Set[int]] = defaultdict(set)

    for ids in norm_bucket.values():
        if len(ids) > 1:
            for i in range(len(ids)):
                for j in range(i + 1, len(ids)):
                    a, b = ids[i], ids[j]
                    adjacency[a].add(b)
                    adjacency[b].add(a)

    items = list(norm_bucket.items())
    for i in range(len(items)):
        norm_i, ids_i = items[i]
        for j in range(i + 1, len(items)):
            norm_j, ids_j = items[j]
            if not norm_i or not norm_j:
                continue
            if set(norm_i.split()).isdisjoint(set(norm_j.split())):
                continue
            score = score_similarity(norm_i, norm_j)
            if score >= threshold:
                for a in ids_i:
                    for b in ids_j:
                        adjacency[a].add(b)
                        adjacency[b].add(a)

    return adjacency


def _connected_components(graph: Dict[int, Set[int]]) -> List[Set[int]]:
    seen: Set[int] = set()
    components: List[Set[int]] = []
    for node in graph.keys():
        if node in seen:
            continue
        comp: Set[int] = set()
        queue: deque[int] = deque([node])
        seen.add(node)
        while queue:
            cur = queue.popleft()
            comp.add(cur)
            for nxt in graph.get(cur, set()):
                if nxt not in seen:
                    seen.add(nxt)
                    queue.append(nxt)
        components.append(comp)
    return components


def _prefer_casing(candidates: Iterable[str]) -> Optional[str]:
    acronyms = [c for c in candidates if len(c) <= 4 and c.isupper()]
    if acronyms:
        return sorted(acronyms, key=len)[0]
    return None


def choose_canonical(cluster: List[Tag]) -> Tag:
    tag_to_usage: Dict[int, int] = {}
    for tag in cluster:
        tag_to_usage[tag.id] = (
            Job.objects.filter(tags__id=tag.id).values("id").distinct().count()
        )
    cluster_sorted = sorted(
        cluster,
        key=lambda t: (-(tag_to_usage.get(t.id, 0)), len(t.text), t.id),
    )
    preferred = cluster_sorted[0]
    return preferred


def cluster_tags(tags: List[Tag], threshold: int) -> List[List[Tag]]:
    if not tags:
        return []
    graph = _build_similarity_graph(tags, threshold)
    for t in tags:
        graph.setdefault(t.id, set())
    components = _connected_components(graph)
    id_to_tag: Dict[int, Tag] = {t.id: t for t in tags}
    clusters: List[List[Tag]] = []
    for comp in components:
        clusters.append([id_to_tag[i] for i in comp])
    return clusters


@transaction.atomic
def merge_cluster(
    cluster: List[Tag], canonical: Tag, dry_run: bool = False
) -> MergeReport:
    other_tags = [t for t in cluster if t.id != canonical.id]
    if not other_tags:
        return MergeReport(
            canonical_tag_id=canonical.id,
            canonical_tag_name=canonical.name,
            merged_tag_ids=[],
            merged_tag_names=[],
            jobs_relinked_count=0,
        )

    jobs_relinked_total = 0
    merged_ids: List[int] = []
    merged_names: List[str] = []

    for dup in other_tags:
        qs = Job.objects.filter(tags__id=dup.id).distinct()
        job_ids = list(qs.values_list("id", flat=True))
        if job_ids:
            if not dry_run:
                for job in Job.objects.filter(id__in=job_ids):
                    job.tags.add(canonical)
                    job.tags.remove(dup)
            jobs_relinked_total += len(job_ids)

        merged_ids.append(dup.id)
        merged_names.append(dup.text)

    if not dry_run:
        Tag.objects.filter(id__in=merged_ids).delete()

    return MergeReport(
        canonical_tag_id=canonical.id,
        canonical_tag_name=canonical.text,
        merged_tag_ids=merged_ids,
        merged_tag_names=merged_names,
        jobs_relinked_count=jobs_relinked_total,
    )


def normalize_all_tags(
    threshold: int = 85, dry_run: bool = False
) -> List[ClusterReport]:
    all_tags = list(Tag.objects.all())
    clusters = cluster_tags(all_tags, threshold)

    reports: List[ClusterReport] = []
    total_jobs = 0
    total_merged = 0

    for cluster in clusters:
        if len(cluster) == 1:
            continue
        canonical = choose_canonical(cluster)
        report = merge_cluster(cluster, canonical, dry_run=dry_run)
        total_jobs += report.jobs_relinked_count
        total_merged += len(report.merged_tag_ids)

        logger.info(
            "Tag normalization cluster -> canonical '%s' (%s). Merged: %s (%s). Jobs relinked: %s",
            report.canonical_tag_name,
            report.canonical_tag_id,
            report.merged_tag_names,
            report.merged_tag_ids,
            report.jobs_relinked_count,
        )

        reports.append(
            ClusterReport(
                canonical_tag_id=report.canonical_tag_id,
                canonical_tag_name=report.canonical_tag_name,
                cluster_size=len(cluster),
                merged_count=len(report.merged_tag_ids),
                jobs_relinked_count=report.jobs_relinked_count,
            )
        )

    logger.info(
        "Tag normalization summary: clusters=%s, tags_merged=%s, jobs_relinked=%s, dry_run=%s",
        len(reports),
        total_merged,
        total_jobs,
        dry_run,
    )

    return reports


# Lightweight helper: find similar tags to a given tag or free text
def find_similar_tags(
    query: Union[str, Tag], threshold: int = 80, top_k: int = 20
) -> List[Tuple[Tag, int]]:
    if isinstance(query, Tag):
        query_text = query.text
        exclude_id = query.id
    else:
        query_text = str(query)
        exclude_id = None

    qnorm = normalize_token(query_text)
    if not qnorm:
        return []

    qtokens = set(qnorm.split())
    results: List[Tuple[Tag, int]] = []

    for tag in Tag.objects.all():
        if exclude_id is not None and tag.id == exclude_id:
            continue
        tnorm = normalize_token(tag.text)
        if not tnorm:
            continue
        # Fast prefilter: require some token overlap
        if qtokens.isdisjoint(set(tnorm.split())):
            continue
        score = int(score_similarity(qnorm, tnorm))
        if score >= threshold:
            results.append((tag, score))

    results.sort(key=lambda x: (-x[1], len(x[0].text), x[0].id))
    return results[:top_k]
