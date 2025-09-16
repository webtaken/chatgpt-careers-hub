"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email must not be empty.",
  }),
  password: z.string().min(1, {
    message: "Password must not be empty.",
  }),
});

export function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo:
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("callbackUrl")
            ? new URLSearchParams(window.location.search).get("callbackUrl")!
            : "/",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  aria-label="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  aria-label="password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Login In..." : "Login"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() =>
            signIn("google", {
              redirectTo:
                typeof window !== "undefined" &&
                new URLSearchParams(window.location.search).get("callbackUrl")
                  ? new URLSearchParams(window.location.search).get(
                      "callbackUrl"
                    )!
                  : "/dashboard",
            })
          }
          disabled={isSubmitting}
        >
          Enter with Google
        </Button>
      </form>
    </Form>
  );
}
