import Header from "@/components/commons/Header";
import { getCategories } from "@/lib/job-actions";

export default async function Page() {
  const categories = await getCategories();

  return (
    <main>
      <Header
        title="FIND THE BEST ChatGPT JOBS IN EDUCATION"
        categories={categories}
      />
    </main>
  );
}
