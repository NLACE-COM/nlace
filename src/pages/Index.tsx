
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <BrainCircuit className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <img 
            src="https://nlace.com/hubfs/nlace_black.svg" 
            alt="NLACE AI Studio" 
            className="h-12 mb-2"
          />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Inteligencia artificial aplicada para tu empresa
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="px-8 py-6 text-base"
            onClick={() => navigate("/dashboard")}
          >
            Comenzar
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base"
            onClick={() => navigate("/agents")}
          >
            Explorar Agentes
          </Button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Total privacidad y control</h3>
            <p className="text-muted-foreground">
              Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Implementación rápida y sin fricciones</h3>
            <p className="text-muted-foreground">
              Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexibilidad total para escalar</h3>
            <p className="text-muted-foreground">
              Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Toda la IA en un solo lugar</h3>
            <p className="text-muted-foreground">
              Con NLACE AI Studio tienes acceso inmediato a todos los modelos LLM disponibles en el mercado: OpenAI, Claude, Gemini, Grok y Deepseek.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Acceso anticipado</h3>
          <p className="text-muted-foreground">
            Estamos en Alpha cerrada. Únete a la lista de espera y sé de los primeros en probarlo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
