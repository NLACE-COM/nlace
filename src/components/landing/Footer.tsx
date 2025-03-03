
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="py-8 md:py-12 border-t border-[#3A3A3A] bg-[#1A1A1A]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src="https://nlace.com/hubfs/nlace_black.svg" alt="NLACE" className="h-7 brightness-0 invert" />
            <p className="text-[#9E9E9E] mt-3">
              © {new Date().getFullYear()} NLACE. {language === "es" ? "Todos los derechos reservados" : "All rights reserved"}.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex gap-8">
              <a href="https://nlace.com/politica" target="_blank" rel="noopener noreferrer" className="text-[#9E9E9E] hover:text-white">
                {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
              </a>
              <a href="https://nlace.com/condiciones" target="_blank" rel="noopener noreferrer" className="text-[#9E9E9E] hover:text-white">
                {language === "es" ? "Términos de Uso" : "Terms of Use"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
