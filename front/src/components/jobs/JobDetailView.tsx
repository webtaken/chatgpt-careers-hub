import { JobRetrieve } from "@/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  ExternalLink,
  Clock,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { JobActions } from "./JobActions";
import { BackToJobsButton } from "./BackToJobsButton";
import { formatRelativeTime } from "@/lib/date-utils";

export function JobDetailView({ job }: { job: JobRetrieve }) {
  const locationString = job.location
    .map((location) => location.location)
    .join(", ");

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Header Section */}
      <header className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{locationString}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <JobActions job={job} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Description */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">
                  Job Description
                </h2>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </CardContent>
            </Card>

            {/* Application Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">
                  Ready to Apply?
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This position is open and accepting applications. Click the
                  button below to apply directly on the company&apos;s website.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-200"
                  asChild
                >
                  <Link href={job.apply_url!} target="_blank">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply for this Position
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Please mention that you found this job on{" "}
                  <a
                    href="https://chatgpt-jobs"
                    className="underline text-primary"
                  >
                    chatgpt-jobs
                  </a>
                  . This helps us get more companies to post here!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Job Details */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">
                    Job Details
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Location
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {locationString}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Job Type
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.remote ? "remote" : "hybrid or office"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Posted
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatRelativeTime(job.created_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              {job.category && job.category.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-foreground">
                      Categories
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.category.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category.text}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Back to Jobs */}
              <Card>
                <CardContent className="pt-6">
                  <BackToJobsButton />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
