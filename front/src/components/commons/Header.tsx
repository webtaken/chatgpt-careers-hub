import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import LinkedinLogo from "../../../public/brands/linkedin-logo.png";
import ZipRecruiterLogo from "../../../public/brands/ziprecruiter-logo.png";
import IndeedLogo from "../../../public/brands/indeed-logo.png";
import { CategoriesListResponse, Category } from "@/client";
import CategoriesSelect from "./CategoriesSelect";
import { SubscriptionForm } from "./SubscriptionForm";

export default function Header({
  title,
  categories,
}: {
  title?: string;
  categories?: CategoriesListResponse;
}) {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-10">
        {title ?? "FIND THE BEST ChatGPT JOBS"}
      </h1>
      <p className="text-center text-sm font-medium">
        Take advantage of the AI Hype and search the best ChatGPT (and LLMs)
        related jobs.
      </p>
      <div className="flex items-center justify-center my-4 gap-x-4">
        <p className="text-sm">As seen in:</p>
        <div className="flex items-center gap-x-3">
          <Image
            src={LinkedinLogo}
            width={100}
            height={100}
            className="w-10 h-10"
            alt="Linkedin"
          />
          <Image
            src={ZipRecruiterLogo}
            width={100}
            height={100}
            className="w-40 h-20"
            alt="Zip Recruiter"
          />
          <Image
            src={IndeedLogo}
            width={100}
            height={100}
            className="w-40 h-10"
            alt="Indeed"
          />
        </div>
      </div>
      <div className="my-4">
        <SubscriptionForm />
      </div>
      {categories && (
        <div className="flex items-center gap-x-2 px-20">
          <p className="text-sm">Filter by:</p>
          <CategoriesSelect categories={categories} />
        </div>
      )}
    </>
  );
}
