"use client";
import { JobRetrieve } from "@/client";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

interface JobActionsProps {
  job: JobRetrieve;
}

export function JobActions({ job }: JobActionsProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this ${job.title} position at ${job.company_name}`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({ title: "Job link copied to clipboard!" });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Job link copied to clipboard!" });
    }
  };

  const handleSave = () => {
    toast({ title: "Job saved to your list!" });
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        size="lg"
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 shadow-lg hover:shadow-xl transition-all duration-200"
        asChild
      >
        <Link href={job.apply_url!} target="_blank">
          <ExternalLink className="w-4 h-4 mr-2" />
          Apply Now
        </Link>
      </Button>
      {/* TODO: Add Save Job functionality later
      <Button variant="outline" size="lg" onClick={handleSave}>
        <Bookmark className="w-4 h-4 mr-2" />
        Save Job
      </Button>
      */}
      <Button
        variant="outline"
        size="lg"
        onClick={handleShare}
        className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 border-secondary/50 hover:border-secondary/70 transition-all duration-200"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
