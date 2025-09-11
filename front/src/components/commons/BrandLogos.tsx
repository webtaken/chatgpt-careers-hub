import Image from "next/image";
import LinkedinLogo from "../../../public/brands/linkedin-logo.png";
import ZipRecruiterLogo from "../../../public/brands/ziprecruiter-logo.png";
import IndeedLogo from "../../../public/brands/indeed-logo.png";

export default function BrandLogos() {
  return (
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
  );
}
