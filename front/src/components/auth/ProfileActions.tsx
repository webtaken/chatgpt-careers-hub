"use client";
import { LogOut, BriefcaseBusinessIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import clsx from "clsx";

export default function ProfileActions({
  session,
  size,
}: {
  session: Session;
  size?: "small" | "medium" | "large";
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          width={100}
          height={100}
          className={clsx(
            "rounded-full border-2",
            (!size || size === "medium") && "w-12 h-12",
            size === "small" && "w-7 h-7",
            size === "large" && "w-20 h-20"
          )}
          src={
            // @ts-expect-error expected
            session.picture ||
            (session.user?.image as string) ||
            "/default_user.jpg"
          }
          alt="profile image"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          My Account <br />{" "}
          <p className="text-xs text-gray-500">{session.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            router.push("/dashboard");
          }}
        >
          <BriefcaseBusinessIcon className="mr-2 w-4 h-4" />
          <span>My jobs</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() =>
            signOut({
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2 w-4 h-4" /> <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
