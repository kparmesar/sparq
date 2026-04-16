import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import FeatureCards from "@/components/home/FeatureCards";
import ActivityFeed from "@/components/home/ActivityFeed";
import CTABanner from "@/components/home/CTABanner";

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
