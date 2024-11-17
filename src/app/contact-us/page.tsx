import NavBar from "@/components/common/NavBar";
import ContactPage from "@/components/pages/ContactPage";

import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";

export default function Contact() {
  return (
    <main>
      <div className="md:32 px-4  md:px-24">
        <ContactPage />
        <FooterSection />
      </div>
    </main>
  );
}
