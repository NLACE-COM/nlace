
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
export const HeroSection = () => {
  const navigate = useNavigate();
  const {
    language
  } = useLanguage();
  return <section className="container max-w-6xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {language === "es" ? "Inteligencia artificial aplicada para tu empresa" : "Applied artificial intelligence for your business"}
          </h1>
          
          <p className="text-lg text-[#9E9E9E] max-w-xl mb-8">
            {language === "es" ? "NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades." : "NLACE AI Studio offers businesses a secure environment to create and manage artificial intelligence agents tailored to their needs."}
          </p>
          
          <button className="px-6 py-2.5 h-auto bg-white text-black hover:bg-gray-50 rounded-md flex items-center justify-center gap-2 text-sm font-medium border border-gray-200 shadow-sm transition-all" onClick={() => navigate("/dashboard")} style={{
          maxWidth: "240px"
        }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" className="h-5" />
            <span className="text-gray-700">Continue with Google</span>
          </button>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="bg-[#2A2A2A] p-6 rounded-xl shadow-lg">
            <img alt="Dashboard Analytics" className="w-full max-w-md rounded-lg" src="/lovable-uploads/9dd64d25-f651-4bee-9982-07d4c39a1989.png" />
          </div>
        </div>
      </div>
    </section>;
};
