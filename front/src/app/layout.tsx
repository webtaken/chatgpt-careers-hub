import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/commons/Navbar";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baseURL = process.env.NEXTAUTH_URL;

export const metadata: Metadata = {
  metadataBase: new URL(baseURL || "https://chatgpt-jobs.com"),
  title: {
    default: "ChatGPT Jobs",
    template: "%s - ChatGPT Jobs",
  },
  description:
    "A portal to find the best ChatGPT and LLMs jobs, niche for experts",
  keywords: ["jobs", "chatgpt", "large language models", "LLMs"],
  openGraph: {
    description:
      "A portal to find the best ChatGPT and LLMs jobs, niche for experts",
    images: [`${baseURL}/brand-icon.png`],
  },
  alternates: {
    canonical: baseURL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
