/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A2mWqz33pSu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

export default function JobListCard({ job }: { job: JobList }) {
  const locationString = job.location.join(",");
  return (
    <Card className="w-full px-2 md:flex md:justify-between">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {job.company_name}
          </span>
          {job.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
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
            {tag}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
