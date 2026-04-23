import { getShowcaseItems } from "@/lib/db/queries";
import ShowcaseBanner from "@/components/showcase/ShowcaseBanner";
import ShowcaseList from "@/components/showcase/ShowcaseList";

export const revalidate = 60;

export const metadata = {
  title: "Showcase | SPARQ",
  description:
    "Publications, posters, presentations, and project highlights from our network.",
};

export default async function ShowcasePage() {
  const items = await getShowcaseItems();

  return (
    <div>
      <ShowcaseBanner />
      <ShowcaseList items={items} />
    </div>
  );
}
