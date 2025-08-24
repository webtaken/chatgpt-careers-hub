import { authOptions } from "@/auth";
import { HireForm } from "@/components/hiring/HireForm";

import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function Page() {
  const session: any = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="px-2 md:px-10 py-6">
      <h1 className="text-2xl font-semibold">
        Hire the best ChatGPT (and LLMs) Experts
      </h1>
      <HireForm session={session} />
    </main>
  );
}
