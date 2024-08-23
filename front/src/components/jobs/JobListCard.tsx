import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { JobList } from "@/client";
import { generateUniqueId } from "@/lib/utils";
import Link from "next/link";

export default function JobListCard({ job }: { job: JobList }) {
  const locationString = job.location
    .map((location) => location.location)
    .join(", ");

  return (
    <Link href={`/job/${job.slug}`}>
      <Card className="w-full px-2 md:flex md:justify-between">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">
              {job.company_name}
            </span>
            {job.verified && (
              <BadgeCheck className="w-4 h-4 text-white fill-blue-500 stroke-slate-200" />
            )}
          </div>
          <CardTitle className="text-lg font-bold text-gray-900">
            {job.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {locationString !== "" ? locationString : "No location"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center space-y-2 space-x-2 pt-2">
          {job.tags.map((tag) => (
            <Badge
              key={generateUniqueId()}
              variant="default"
              className="bg-gray-200 text-gray-800"
            >
              {tag.text}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
