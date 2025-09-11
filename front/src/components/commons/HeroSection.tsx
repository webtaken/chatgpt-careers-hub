interface HeroSectionProps {
  title?: string;
}

export default function HeroSection({ title }: HeroSectionProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-10">
        {title ?? "FIND THE BEST ChatGPT JOBS"}
      </h1>
      <p className="text-center text-sm font-medium">
        Take advantage of the AI Hype and search the best ChatGPT related jobs.
      </p>
    </>
  );
}
