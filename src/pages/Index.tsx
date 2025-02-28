
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
import { Globe } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Header con logo y selector de idioma */}
      <header className="container max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <img 
              src="https://nlace.com/hubfs/nlace_black.svg" 
              alt="NLACE" 
              className="h-8 invert"
            />
            <span className="text-xl font-semibold">AI Studio</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={(value) => setLanguage(value as "es" | "en")}>
            <SelectTrigger className="w-32 bg-transparent border-gray-700">
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
          <Button 
            onClick={() => navigate("/dashboard")}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            {t("dashboard")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "es" ? "Inteligencia artificial aplicada para tu empresa" : "Applied artificial intelligence for your business"}
            </h1>
            
            <p className="text-lg text-gray-300 max-w-xl">
              {language === "es" 
                ? "NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades."
                : "NLACE AI Studio offers businesses a secure environment to create and manage artificial intelligence agents tailored to their needs."}
            </p>
            
            <Button
              className="px-6 py-2.5 bg-white text-black hover:bg-gray-100 rounded-md flex items-center justify-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <img 
                src="/public/lovable-uploads/ed1a6be8-b1c3-41c4-8543-f14ef0683e3b.png" 
                alt="Google Logo" 
                className="h-5" 
              />
              Continue with Google
            </Button>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#262B38] p-4 rounded-lg shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Dashboard Analytics" 
                className="w-full max-w-md rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="border-t border-b border-gray-700 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            <img src="/placeholder.svg" alt="OpenAI" className="h-10 opacity-50" />
            <img src="/placeholder.svg" alt="Metricool" className="h-8 opacity-50" />
            <img src="/placeholder.svg" alt="Gemini" className="h-8 opacity-50" />
            <img src="/placeholder.svg" alt="LangChain" className="h-8 opacity-50" />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="bg-[#FAF2DE] rounded-xl p-4 md:p-8 shadow-xl">
            <img 
              src="/placeholder.svg" 
              alt="Dashboard Demo" 
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <img src="/placeholder.svg" alt="Privacy Icon" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">
                {language === "es" ? "Total privacidad y control" : "Total privacy and control"}
              </h3>
              <p className="text-gray-400">
                {language === "es"
                  ? "Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos."
                  : "Your data is only yours. We train AI with your internal information without sharing anything with third parties or relying on public models."}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <img src="/placeholder.svg" alt="Speed Icon" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">
                {language === "es" ? "Implementación rápida y sin fricciones" : "Fast and frictionless implementation"}
              </h3>
              <p className="text-gray-400">
                {language === "es"
                  ? "Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato."
                  : "Our agents integrate with tools you already use, like Metricool, so you can start seeing results right away."}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <img src="/placeholder.svg" alt="Flexibility Icon" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">
                {language === "es" ? "Flexibilidad total para escalar" : "Total flexibility to scale"}
              </h3>
              <p className="text-gray-400">
                {language === "es"
                  ? "Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación."
                  : "Every company is unique. We adapt AI to your goals, helping you automate processes, improve customer experience, and optimize your operation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alpha Access Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-4xl font-bold">
                {language === "es" ? "Únete al alpha" : "Join the alpha"}
              </h2>
              <h3 className="text-2xl text-gray-300">
                {language === "es" ? "Acceso anticipado" : "Early access"}
              </h3>
              <p className="text-gray-400">
                {language === "es" 
                  ? "Estamos en Alpha cerrada, únete a la lista de espera y sé de los primeros en probarlo."
                  : "We're in closed Alpha, join the waitlist and be among the first to try it."}
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-[#DCF3F0] p-8 rounded-xl max-w-md w-full">
                <img 
                  src="/placeholder.svg" 
                  alt="Card Illustration" 
                  className="w-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img 
                src="https://nlace.com/hubfs/nlace_black.svg" 
                alt="NLACE" 
                className="h-7 invert"
              />
              <p className="text-gray-500 mt-2">
                © {new Date().getFullYear()} NLACE. {language === "es" ? "Todos los derechos reservados" : "All rights reserved"}.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex gap-8">
                <a href="#" className="text-gray-400 hover:text-white">
                  {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
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
