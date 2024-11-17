import NavBar from "@/components/common/NavBar";
import RefundPolicyPage from "@/components/pages/RefundPolicyPage";
import FooterSection from "@/components/sections/FooterSection";

export default function RefundPolicy() {
  return (
    <main>
      <div className="md:32 px-4  md:px-[9rem]">
        <RefundPolicyPage />
        <FooterSection />
      </div>
    </main>
  );
}
