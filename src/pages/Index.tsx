
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { PartnerLogos } from "@/components/landing/PartnerLogos";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { AlphaAccessSection } from "@/components/landing/AlphaAccessSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <Header />
      <style jsx global>{`
        @media (max-width: 768px) {
          section {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .py-24, .py-20 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
      <HeroSection />
      <PartnerLogos />
      <DemoVideo />
      <FeaturesSection />
      <FAQSection />
      <AlphaAccessSection />
      <Footer />
    </div>
  );
};

export default Index;
