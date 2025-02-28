
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Lock, Zap, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-white">
      {/* Header con logo y selector de idioma */}
      <header className="container max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
        <div>
          <div className="flex items-end gap-2">
            <img 
              src="https://nlace.com/hubfs/nlace_black.svg" 
              alt="NLACE" 
              className="h-8 brightness-0 invert"
            />
            <span className="text-xl font-semibold text-white pb-0.5">AI Studio</span>
          </div>
        </div>
        <div>
          <Select value={language} onValueChange={(value) => setLanguage(value as "es" | "en")}>
            <SelectTrigger className="w-32 bg-transparent border-[#8E9196] text-[#8E9196]">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <SelectValue>{language === "es" ? "Español" : "English"}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {language === "es" ? "Inteligencia artificial aplicada para tu empresa" : "Applied artificial intelligence for your business"}
            </h1>
            
            <p className="text-lg text-[#8E9196] max-w-xl">
              {language === "es" 
                ? "NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades."
                : "NLACE AI Studio offers businesses a secure environment to create and manage artificial intelligence agents tailored to their needs."}
            </p>
            
            <Button
              className="mt-4 px-6 py-6 h-auto bg-white text-black hover:bg-gray-100 rounded-md flex items-center justify-center gap-2 text-base font-medium"
              onClick={() => navigate("/dashboard")}
            >
              <img 
                src="/lovable-uploads/ed1a6be8-b1c3-41c4-8543-f14ef0683e3b.png" 
                alt="Google Logo" 
                className="h-5" 
              />
              Continue with Google
            </Button>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#292E3B] p-6 rounded-xl shadow-2xl border border-[#8E9196]/30">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Dashboard Analytics" 
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="border-t border-b border-[#8E9196]/30 py-10 bg-[#333333]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="h-8 opacity-70 brightness-0 invert" />
            <img src="/placeholder.svg" alt="Metricool" className="h-8 opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Bard_logo.svg" alt="Gemini" className="h-8 opacity-70" />
            <img src="https://python.langchain.com/img/langchain_icon.png" alt="LangChain" className="h-9 opacity-70" />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-[#2B2B2B]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-xl p-6 md:p-8 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Dashboard Demo" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-xl border-4 border-white/30" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#222222]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="bg-[#6E59A5]/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <Lock className="h-8 w-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === "es" ? "Total privacidad y control" : "Total privacy and control"}
              </h3>
              <p className="text-[#8E9196] text-base leading-relaxed">
                {language === "es"
                  ? "Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos."
                  : "Your data is only yours. We train AI with your internal information without sharing anything with third parties or relying on public models."}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#6E59A5]/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <Zap className="h-8 w-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === "es" ? "Implementación rápida y sin fricciones" : "Fast and frictionless implementation"}
              </h3>
              <p className="text-[#8E9196] text-base leading-relaxed">
                {language === "es"
                  ? "Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato."
                  : "Our agents integrate with tools you already use, like Metricool, so you can start seeing results right away."}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#6E59A5]/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <BarChart className="h-8 w-8 text-[#9b87f5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {language === "es" ? "Flexibilidad total para escalar" : "Total flexibility to scale"}
              </h3>
              <p className="text-[#8E9196] text-base leading-relaxed">
                {language === "es"
                  ? "Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación."
                  : "Every company is unique. We adapt AI to your goals, helping you automate processes, improve customer experience, and optimize your operation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alpha Access Section */}
      <section className="py-24 bg-[#2B2B2B]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                {language === "es" ? "Únete al alpha" : "Join the alpha"}
              </h2>
              <h3 className="text-2xl text-[#8E9196]">
                {language === "es" ? "Acceso anticipado" : "Early access"}
              </h3>
              <p className="text-[#8E9196] text-lg leading-relaxed">
                {language === "es" 
                  ? "Estamos en Alpha cerrada, únete a la lista de espera y sé de los primeros en probarlo."
                  : "We're in closed Alpha, join the waitlist and be among the first to try it."}
              </p>
              
              <Button className="mt-4 bg-white text-[#2B2B2B] hover:bg-gray-100 rounded-md">
                {language === "es" ? "Unirse a la lista" : "Join waitlist"}
              </Button>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-[#D6BCFA] to-[#9b87f5] p-8 rounded-xl max-w-md w-full shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Card Illustration" 
                  className="w-full rounded-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#8E9196]/30 bg-[#222222]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img 
                src="https://nlace.com/hubfs/nlace_black.svg" 
                alt="NLACE" 
                className="h-7 brightness-0 invert"
              />
              <p className="text-[#8E9196] mt-2">
                © {new Date().getFullYear()} NLACE. {language === "es" ? "Todos los derechos reservados" : "All rights reserved"}.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex gap-8">
                <a href="#" className="text-[#8E9196] hover:text-white">
                  {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
                </a>
                <a href="#" className="text-[#8E9196] hover:text-white">
                  {language === "es" ? "Términos de Uso" : "Terms of Use"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
