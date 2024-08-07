import Header from "@/components/commons/Header";
import { getCategories } from "@/lib/job-actions";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="">
      <Header categories={categories} />
    </main>
  );
}
