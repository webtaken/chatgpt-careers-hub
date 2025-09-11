import { Button } from "../ui/button";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center">
      <p className="text-center text-sm text-foreground">
        Find us on our social media 👉
      </p>
      <Button variant="link" asChild className="px-1">
        <Link
          href="https://www.linkedin.com/company/chatgpt-jobs-all"
          target="_blank"
        >
          Linkedin
        </Link>
      </Button>
    </div>
  );
}
