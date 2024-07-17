"use client";

import { HireForm } from "@/components/hiring/HireForm";
import Link from "@tiptap/extension-link";

import { EditorProvider, Extensions, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function Page() {
  return (
    <main className="px-2 md:px-10 py-6">
      <h1 className="text-2xl font-semibold">
        Hire the best ChatGPT (and LLMs) Experts
      </h1>
      <HireForm />
    </main>
  );
}
