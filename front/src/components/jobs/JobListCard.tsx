import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Globe2, Clock3 } from "lucide-react";
import { JobList } from "@/client";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/date-utils";

export default function JobListCard({ job }: { job: JobList }) {
  const locationString = job.location
    .map((location) => location.location)
    .join(", ");

  const descriptionSnippet = job.description
    ? job.description.replace(/<[^>]+>/g, "").slice(0, 160) +
      (job.description.length > 160 ? "…" : "")
    : "";

  return (
    <Link
      href={`/job/${job.slug}`}
      className="hover:bg-accent/40 transition-colors"
    >
      <Card className="w-full px-2 md:px-4 py-2 md:py-3 border-0 shadow-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <CardHeader className="p-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground/90">
                {job.company_name}
              </span>
              {job.verified && (
                <BadgeCheck className="w-4 h-4 text-primary fill-primary/20" />
              )}
            </div>
            <CardTitle className="text-base md:text-lg font-semibold text-foreground">
              {job.title}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
              <span>
                {locationString !== "" ? locationString : "No location"}
              </span>
              {locationString.toLowerCase().includes("remote") && (
                <span className="inline-flex items-center gap-1">
                  <Globe2 className="w-3 h-3" /> Remote
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 flex flex-col md:items-end gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {job.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="bg-muted text-foreground"
                >
                  {tag.text}
                </Badge>
              ))}
              {job.tags.length > 4 && (
                <Badge variant="outline">+{job.tags.length - 4}</Badge>
              )}
            </div>
            {descriptionSnippet && (
              <p className="hidden md:block text-xs text-muted-foreground max-w-xl line-clamp-1">
                {descriptionSnippet}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="w-3 h-3" />
              <span>{formatRelativeTime(job.created_at)}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
