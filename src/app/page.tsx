import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";

const FeatureCards = dynamic(() => import("@/components/home/FeatureCards"));
const ActivityFeed = dynamic(() => import("@/components/home/ActivityFeed"));
const CTABanner = dynamic(() => import("@/components/home/CTABanner"));

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeatureCards />
      <ActivityFeed />
      <CTABanner />
    </>
  );
}
