import NavBar from "@/components/common/NavBar";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import FooterSection from "@/components/sections/FooterSection";

export default function PrivacyPolicy() {
  return (
    <main>
      <div className="md:32 px-4  md:px-[9rem]">
        <PrivacyPolicyPage />
        <FooterSection />
      </div>
    </main>
  );
}
