
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
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          AgentifyCollaborate
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A sophisticated multi-agent AI system that empowers your business with
          intelligent automation and collaborative workflows.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="px-8 py-6 text-base"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base"
            onClick={() => navigate("/agents")}
          >
            Explore Agents
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom AI Agents</h3>
            <p className="text-muted-foreground">
              Configure specialized AI agents tailored to your business needs
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Private Knowledge Base</h3>
            <p className="text-muted-foreground">
              Secure company knowledge that only your agents can access
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-muted">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Seamlessly integrate AI agents into your existing workflows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
