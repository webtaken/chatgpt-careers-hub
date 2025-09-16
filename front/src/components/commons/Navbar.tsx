import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileActions from "../auth/ProfileActions";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-4 pt-3">
      <Link href="/" className="flex items-center gap-x-2">
        <Image
          src="/brand-icon.png"
          alt="Brand icon"
          className="w-14 h-14 rounded-full"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-semibold">ChatGPT Jobs</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Button asChild>
          <Link href={session ? "/hiring" : "/signin"}>Start Hiring</Link>
        </Button>
        {session && <ProfileActions size="medium" session={session} />}
      </div>
    </nav>
  );
}
