import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import { getLatestProjects, getUpcomingEvents, getLatestShowcase } from "@/lib/db/queries";
import ActivityFeed from "@/components/home/ActivityFeed";

const FeatureCards = dynamic(() => import("@/components/home/FeatureCards"));
const CTABanner = dynamic(() => import("@/components/home/CTABanner"));

export const revalidate = 60;

export default async function Home() {
  const [projects, events, showcaseItems] = await Promise.all([
    getLatestProjects(3),
    getUpcomingEvents(2),
    getLatestShowcase(2),
  ]);

  return (
    <>
      <Hero />
      {/* <StatsBar /> */}
      <FeatureCards />
      <ActivityFeed projects={projects} events={events} showcaseItems={showcaseItems} />
      <CTABanner />
    </>
  );
}
