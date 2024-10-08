"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Editor from "../hiring/Editor";
import { Button } from "@/components/ui/button";
import { UseFormSetValue } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { TagsSelector } from "../hiring/TagsSelector";
import { LocationSelector } from "../hiring/LocationSelector";
import { updateJob } from "@/lib/job-actions";
import { CategorySelector } from "../hiring/CategorySelector";
import { useState } from "react";
import { JobRetrieve } from "@/client";
import { FormSchema } from "../hiring/HireForm";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Option } from "../ui/multiple-selector";

export type EditJobFormSetValueSchema = UseFormSetValue<{
  companyName: string;
  title: string;
  description: string;
  tags: {
    id: string;
    text: string;
  }[];
  categories: {
    id: string;
    text: string;
  }[];
  applyURL: string;
  applyEmail: string;
  companyEmail: string;
  remote?: boolean | undefined;
  applyByEmail?: boolean | undefined;
  pinOnTop?: boolean | undefined;
  locations: {
    id: string;
    name: string;
    type: string;
  }[];
}>;

export function EditJobForm({
  session,
  job,
}: {
  session?: any;
  job: JobRetrieve;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: job.company_name,
      title: job.title,
      tags: job.tags.map((tag) => {
        return {
          id: String(tag.id),
          text: tag.text,
        };
      }),
      categories: job.category.map((cat) => {
        return {
          id: String(cat.id),
          text: cat.text,
        };
      }),
      locations: job.location.map((loc) => {
        return {
          id: String(loc.id),
          name: loc.location,
          type: loc.location_type,
        };
      }),
      description: job.description,
      remote: job.remote,
      applyURL: job.apply_url!,
      applyByEmail: job.apply_by_email,
      applyEmail: job.apply_email || "",
      companyEmail: job.company_email,
      pinOnTop: job.pin_on_top,
      verified: job.verified,
    },
  });
  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await updateJob(job.id, data);
    setLoading(false);
    if (response) {
      toast({
        title: "Trabajo editado",
      });
      router.push(`/job/${job.slug}`);
    } else {
      toast({
        title: "Error al editar el trabajo",
        variant: "destructive",
      });
    }
  }

  const defaultTags = job.tags.map((tag) => {
    return {
      value: tag.text,
      label: tag.text,
    };
  });

  const defaultLocations: Option[] = job.location.map((loc) => {
    return {
      label: loc.location,
      value: loc.location,
      group: loc.location_type,
    };
  });

  const defaultCategories = job.category.map((cat) => {
    return {
      value: cat.slug || cat.text,
      label: cat.text,
    };
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 space-y-4"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Company Name"
                  aria-label="company name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your company&apos;s brand/trade name: without Inc., Ltd., B.V.,
                Pte., etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" aria-label="job title" {...field} />
              </FormControl>
              <FormDescription>
                Please specify as single job position like &quot;Machine
                Learning Engineer&quot; or &quot;Deep learning researcher&quot;,
                not a sentence like &quot;Looking for PM / Biz Dev /
                Manager&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags, Keywords, or Stack</FormLabel>
              <FormControl>
                <TagsSelector setValue={setValue} defaultValue={defaultTags} />
              </FormControl>
              <FormDescription>
                Short tags are preferred. Use tags like industry and tech stack.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSelector
                  setValue={setValue}
                  defaultValue={defaultLocations}
                />
              </FormControl>
              <FormDescription>
                If you&apos;d only like to hire people from a specific location
                or timezone this job is restricted to (e.g. Europe, United
                States or Japan). If not restricted, please leave it as
                &quot;Worldwide&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelector
                  setValue={setValue}
                  defaultValue={defaultCategories}
                />
              </FormControl>
              <FormDescription>
                Set a category to filter your job by industry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remote"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2">
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="remoteWork"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="remoteWork">Do you allow remote work?</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="w-full h-auto">
                  <Editor content={field.value} setValue={setValue} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applyURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apply URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://"
                  aria-label="apply url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Apply URLs with a form an applicant can fill out generally
                receive a lot more applicants than having people apply by email
                (below). A good platform to have applicants apply on is Lever
                (not affiliated).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applyByEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="applyByEmail"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="applyByEmail"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow applications by Email
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().applyByEmail && (
          <FormField
            control={form.control}
            name="applyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apply Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apply Email Address"
                    aria-label="apply email address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This email is public (!), the [ Apply ] button links to it if
                  you do not specify an Apply URL above. We recommend using an
                  Apply URL, instead of an Apply Email Address, because you
                  might get a lot of spam/automated applicants by email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email (For Invoice)</FormLabel>
              <FormControl>
                <Input
                  aria-label="company email address for invoice"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Make sure this email is accessible by you! We use this to send
                the invoice and edit link. We can not and do not manually resend
                it! If you use your company domain (same as company name), we
                will show a [ Verified ] tag on your job post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {session && session.user?.is_staff && (
          <FormField
            control={form.control}
            name="verified"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verifiedCheck"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="verifiedCheck"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Verified (only for staff members)
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button
          disabled={loading}
          type="submit"
          className="flex items-center gap-x-2"
        >
          {loading && <Loader2Icon className="w-3 h-3 animate-spin" />} Update
        </Button>
      </form>
    </Form>
  );
}
