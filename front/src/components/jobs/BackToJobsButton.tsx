"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackToJobsButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full bg-gradient-to-r from-muted to-muted/80 hover:from-muted/90 hover:to-muted/70 border-muted/50 hover:border-muted/70 transition-all duration-200"
      onClick={() => router.push("/")}
    >
      ← Back to All Jobs
    </Button>
  );
}
