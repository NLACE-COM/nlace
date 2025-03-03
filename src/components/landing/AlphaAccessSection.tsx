
import { Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export const AlphaAccessSection = () => {
  const { language } = useLanguage();
  
  // Load HubSpot script when component is mounted
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/39533233.js";
    script.defer = true;
    document.head.appendChild(script);

    // Cleanup when unmounting
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <section className="py-12 md:py-24 bg-[#212121]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <div className="bg-[#A347F0]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Rocket className="h-6 w-6 text-[#A347F0]" />
              </div>
              {language === "es" ? "Únete al alpha" : "Join the alpha"}
            </h2>
            <h3 className="text-2xl text-[#9E9E9E] mb-4">
              {language === "es" ? "Acceso anticipado" : "Early access"}
            </h3>
            <p className="text-[#9E9E9E] text-lg leading-relaxed">
              {language === "es" ? "Estamos en Alpha cerrada, únete a la lista de espera y sé de los primeros en probarlo." : "We're in closed Alpha, join the waitlist and be among the first to try it."}
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-[#E3F4EC] p-8 rounded-xl max-w-md w-full shadow-lg">
              {/* HubSpot Form integration */}
              <div className="hs-form-frame" data-region="na1" data-form-id="c830ca7e-0c48-49dd-86d1-2d0a57c5caf4" data-portal-id="39533233"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
