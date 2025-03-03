
import { Shield, Zap, CreditCard } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useLanguage } from "@/contexts/LanguageContext";

export const FeaturesSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-12 md:py-24 bg-[#1A1A1A]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          <FeatureCard 
            icon={Shield}
            iconColor="text-[#2A7DDA]"
            iconBgColor="bg-[#2A7DDA]/10"
            title={language === "es" ? "Total privacidad y control" : "Total privacy and control"}
            description={language === "es" ? "Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos." : "Your data is only yours. We train AI with your internal information without sharing anything with third parties or relying on public models."}
          />
          
          <FeatureCard 
            icon={Zap}
            iconColor="text-[#A347F0]"
            iconBgColor="bg-[#A347F0]/10"
            title={language === "es" ? "Implementación rápida y sin fricciones" : "Fast and frictionless implementation"}
            description={language === "es" ? "Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato." : "Our agents integrate with tools you already use, like Metricool, so you can start seeing results right away."}
          />
          
          <FeatureCard 
            icon={CreditCard}
            iconColor="text-[#F5AF2C]"
            iconBgColor="bg-[#F5AF2C]/10"
            title={language === "es" ? "Flexibilidad total para escalar" : "Total flexibility to scale"}
            description={language === "es" ? "Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación." : "Every company is unique. We adapt AI to your goals, helping you automate processes, improve customer experience, and optimize your operation."}
          />
        </div>
      </div>
    </section>
  );
};
