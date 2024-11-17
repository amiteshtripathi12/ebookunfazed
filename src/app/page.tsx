import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ServiceSection from "@/components/sections/ServiceSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VideoPlayerSection from "@/components/sections/VideoPlayerSection";

export default function Home() {
  return (
    <main>
      <div className="mt-24 md:32 lg:mt-8 px-4 md:px-[9rem]">
        <div id="home-section">
          <HeroSection />
        </div>
        <div id="about-section">
          <ServiceSection />
        </div>
        <VideoPlayerSection />
        <TestimonialSection />
        <div id="qa-section">
          <FAQSection />
        </div>
        <NewsletterSection />
        <FooterSection />
      </div>
    </main>
  );
}
