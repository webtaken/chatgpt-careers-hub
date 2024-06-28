import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 pt-3">
      <div className="flex items-center gap-x-2">
        <Image
          src="/brand-icon.png"
          alt="Brand icon"
          className="w-14 h-14 rounded-full"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-semibold">ChatGPT Careers Hub</h1>
      </div>
      <div className="flex items-center gap-x-2">
        <Button>Post a Job - $100</Button>
      </div>
    </nav>
  );
}
