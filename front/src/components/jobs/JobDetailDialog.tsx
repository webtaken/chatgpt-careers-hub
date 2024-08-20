"use client";
import { JobRetrieve } from "@/client";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function JobDetailDialog({ job }: { job: JobRetrieve }) {
  const router = useRouter();
  const locationString = job.location.join(", ");

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.push("/");
      }}
    >
      <DialogContent className="h-3/4">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>
            <p>
              At {job.company_name} • {locationString}
            </p>
            <div className="flex items-center my-4 space-x-2">
              <p>Share:</p>
              <button
                className="rounded-full p-1 hover:bg-accent"
                onClick={() => {
                  toast({ title: "Link copied!" });
                }}
              >
                <LinkIcon className="w-3.5 h-3.5 rounded-full" />
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <article
          className="prose-sm overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: job.description }}
        ></article>

        <DialogFooter className="grid grid-cols-1">
          <Button asChild className="w-full">
            <Link href={job.apply_url!} target="_blank" className="w-full">
              Apply
            </Link>
          </Button>
          <p className="text-xs text-center mt-2">
            Please mention that you found this job on{" "}
            <a href="https://chatgpt-jobs" className="underline">
              chatgpt-jobs
            </a>
            , this helps us get more companies to post here, thanks!
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
