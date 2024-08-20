import { authOptions } from "@/auth";
import { HireForm } from "@/components/hiring/HireForm";

import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="px-2 md:px-10 py-6">
      <h1 className="text-2xl font-semibold">
        Hire the best ChatGPT (and LLMs) Experts
      </h1>
      <HireForm session={session} />
    </main>
  );
}
