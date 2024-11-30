"use client";
import NavBar from "@/components/common/NavBar";
import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ServiceSection from "@/components/sections/ServiceSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VideoPlayerSection from "@/components/sections/VideoPlayerSection";
import {useState} from "react";

export default function Home() {
  return (
    <main>
      {/* <NavBar isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} /> */}
      <div className="mt-24 md:32 lg:mt-8 px-4 md:px-[9rem]">
        <div id="home-section">
          <HeroSection />
        </div>
        <div id="about-section">
          <VideoPlayerSection />
          <ServiceSection />
        </div>

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
