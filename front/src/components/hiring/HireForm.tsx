"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Editor from "./Editor";
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name must not be empty.",
  }),
  title: z.string().min(8, {
    message: "Job title must be at least 8 characters.",
  }),
  remote: z.boolean().default(false).optional(),
  description: z.string().min(1, {
    message: "Job description must not be empty.",
  }),
  applyURL: z.string().min(1, {
    message: "Apply URL must not be empty.",
  }),
  applyByEmail: z.boolean().default(false).optional(),
  applyEmail: z.string(),
  companyEmail: z.string().min(1, {
    message: "Company email must not be empty.",
  }),
  pinOnTop: z.boolean().default(false).optional(),
});

export function HireForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      title: "",
      remote: false,
      applyURL: "",
      applyByEmail: false,
      applyEmail: "",
      companyEmail: "",
      pinOnTop: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
                  <Editor content={field.value} setValue={form.setValue} />
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
        <FormField
          control={form.control}
          name="pinOnTop"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pinOnTop"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="pinOnTop"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pin on top for 30 days (+$99)
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
