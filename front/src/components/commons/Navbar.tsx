import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileActions from "../auth/ProfileActions";
import { auth } from "@/auth";
import CategoryHeader from "./CategoryHeader";

export default async function Navbar() {
  const session = await auth();

  return (
    <>
      <nav className="flex items-center justify-between px-4 bg-white border-b py-2">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            src="/brand-icon.png"
            alt="Brand icon"
            className="w-10 h-10 rounded-full"
            width={100}
            height={100}
          />
          <h1 className="text-xl font-semibold">ChatGPT Jobs</h1>
        </Link>
        <CategoryHeader />
        <div className="flex items-center gap-x-2">
          <Link
            href="/news"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            News
          </Link>
          <Link
            href="/trainings"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Trainings
          </Link>
          <Link
            href="/promotions"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Promotions
          </Link>
          <Button asChild>
            <Link href={session ? "/hiring" : "/signin"}>Start Hiring</Link>
          </Button>
          {session && <ProfileActions size="medium" session={session} />}
        </div>
      </nav>
    </>
  );
}
