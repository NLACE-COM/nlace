
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ArrowRight, Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MetricsCard } from "@/components/MetricsCard";

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header con selector de idioma */}
      <header className="container max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
        <div>
          <img 
            src="https://nlace.com/hubfs/nlace_black.svg" 
            alt="NLACE AI Studio" 
            className="h-10"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={(value) => setLanguage(value as "es" | "en")}>
            <SelectTrigger className="w-32">
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
          <Button onClick={() => navigate("/dashboard")}>
            {t("dashboard")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {language === "es" ? "Inteligencia artificial aplicada para tu empresa" : "Applied artificial intelligence for your business"}
            </h1>
            
            <p className="text-xl text-slate-700 max-w-xl">
              {language === "es" 
                ? "NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades."
                : "NLACE AI Studio offers businesses a secure environment to create and manage artificial intelligence agents tailored to their needs."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-base rounded-full"
                onClick={() => navigate("/dashboard")}
              >
                {language === "es" ? "Comenzar" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base rounded-full"
                onClick={() => navigate("/agents")}
              >
                {language === "es" ? "Explorar Agentes" : "Explore Agents"}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative z-10">
                <img 
                  src="/placeholder.svg" 
                  alt="AI Visualization" 
                  className="w-full max-w-lg rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {language === "es" ? "Capacidades clave" : "Key capabilities"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {language === "es" 
                ? "Descubre cómo NLACE AI Studio transforma la operación de tu negocio con inteligencia artificial." 
                : "Discover how NLACE AI Studio transforms your business operation with artificial intelligence."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "es" ? "Total privacidad y control" : "Total privacy and control"}
                </h3>
                <p className="text-slate-600">
                  {language === "es"
                    ? "Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos."
                    : "Your data is only yours. We train AI with your internal information without sharing anything with third parties or relying on public models."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "es" ? "Implementación rápida y sin fricciones" : "Fast and frictionless implementation"}
                </h3>
                <p className="text-slate-600">
                  {language === "es"
                    ? "Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato."
                    : "Our agents integrate with tools you already use, like Metricool, so you can start seeing results right away."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "es" ? "Flexibilidad total para escalar" : "Total flexibility to scale"}
                </h3>
                <p className="text-slate-600">
                  {language === "es"
                    ? "Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación."
                    : "Every company is unique. We adapt AI to your goals, helping you automate processes, improve customer experience, and optimize your operation."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "es" ? "Toda la IA en un solo lugar" : "All AI in one place"}
                </h3>
                <p className="text-slate-600">
                  {language === "es"
                    ? "Con NLACE AI Studio tienes acceso inmediato a todos los modelos LLM disponibles en el mercado: OpenAI, Claude, Gemini, Grok y Deepseek."
                    : "With NLACE AI Studio you have immediate access to all LLM models available in the market: OpenAI, Claude, Gemini, Grok and Deepseek."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {language === "es" ? "Resultados probados" : "Proven results"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {language === "es" 
                ? "Nuestros clientes experimentan resultados tangibles desde el primer día" 
                : "Our clients experience tangible results from day one"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title={language === "es" ? "Ahorro de tiempo" : "Time savings"}
              value="68%"
              description={language === "es" ? "Reducción en tiempo dedicado a tareas repetitivas" : "Reduction in time spent on repetitive tasks"}
              icon={<Check className="h-5 w-5" />}
              trend={{ value: 12, positive: true }}
            />
            
            <MetricsCard
              title={language === "es" ? "Satisfacción del cliente" : "Customer satisfaction"}
              value="93%"
              description={language === "es" ? "De los clientes reportan mejor experiencia" : "Of customers report better experience"}
              icon={<Check className="h-5 w-5" />}
              trend={{ value: 8, positive: true }}
            />
            
            <MetricsCard
              title={language === "es" ? "Reducción de costos" : "Cost reduction"}
              value="32%"
              description={language === "es" ? "Disminución en costos operativos" : "Decrease in operational costs"}
              icon={<Check className="h-5 w-5" />}
              trend={{ value: 15, positive: true }}
            />
            
            <MetricsCard
              title={language === "es" ? "Tasa de conversión" : "Conversion rate"}
              value="47%"
              description={language === "es" ? "Aumento en conversiones de ventas" : "Increase in sales conversions"}
              icon={<Check className="h-5 w-5" />}
              trend={{ value: 23, positive: true }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-12 md:p-16 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {language === "es" ? "¿Listo para transformar tu negocio?" : "Ready to transform your business?"}
                  </h2>
                  <p className="text-white/80 text-lg mb-8">
                    {language === "es" 
                      ? "Únete a las empresas que ya están aprovechando el poder de la IA personalizada."
                      : "Join the companies already leveraging the power of customized AI."}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base rounded-full"
                    onClick={() => navigate("/dashboard")}
                  >
                    {language === "es" ? "Comenzar ahora" : "Start now"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative w-72 h-72 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                      <BrainCircuit className="h-32 w-32 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img 
                src="https://nlace.com/hubfs/nlace_black.svg" 
                alt="NLACE AI Studio" 
                className="h-8"
              />
              <p className="text-slate-500 mt-2">
                © {new Date().getFullYear()} NLACE. {language === "es" ? "Todos los derechos reservados" : "All rights reserved"}.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex gap-8">
                <a href="#" className="text-slate-600 hover:text-primary">
                  {language === "es" ? "Términos" : "Terms"}
                </a>
                <a href="#" className="text-slate-600 hover:text-primary">
                  {language === "es" ? "Privacidad" : "Privacy"}
                </a>
                <a href="#" className="text-slate-600 hover:text-primary">
                  {language === "es" ? "Contacto" : "Contact"}
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
