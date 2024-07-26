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
import { signUp } from "@/lib/auth-actions";
import { useState } from "react";

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email must not be empty.",
      })
      .email("Invalid email address."),
    password1: z.string().min(1, {
      message: "Password must not be empty.",
    }),
    password2: z.string().min(1, {
      message: "Password must not be empty.",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"], // This specifies which field the error is associated with
  });

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password1: "",
      password2: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const response = await signUp({
        email: data.email,
        username: data.email,
        password1: data.password1,
        password2: data.password2,
      });
      if (typeof response !== "boolean") {
        toast({
          title: "An error ocurred try again later.",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(
                  response ?? { message: "Contact support." },
                  null,
                  1
                )}
              </code>
            </pre>
          ),
        });
      } else {
        signIn("credentials", {
          email: data.email,
          password: data.password1,
          callbackUrl: "/",
        });
      }
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
          name="password1"
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
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Repeat password"
                  aria-label="repeat password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          disabled={isSubmitting}
        >
          Enter with Google
        </Button>
      </form>
    </Form>
  );
}
