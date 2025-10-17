import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/commons/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { CSPostHogProvider } from "./provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const baseURL = process.env.AUTH_URL;

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
    type: "website",
    siteName: "ChatGPT Jobs",
    url: baseURL || "https://www.chatgpt-jobs.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Jobs",
    description:
      "A portal to find the best ChatGPT and LLMs jobs, niche for experts",
    images: [`${baseURL}/brand-icon.png`],
    creator: "@chatgpt_jobs",
  },
  alternates: {
    canonical: baseURL,
  },
  authors: [{ name: "ChatGPT Jobs" }],
  creator: "ChatGPT Jobs",
  publisher: "ChatGPT Jobs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={cn(
            "min-h-screen bg-slate-50 font-sans antialiased",
            fontSans.variable
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
