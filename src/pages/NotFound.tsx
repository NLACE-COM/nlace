
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "Error 404: El usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <BrainCircuit className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Lo sentimos, la página que buscas no se encuentra disponible.
        </p>
        
        <Button 
          size="lg" 
          className="px-8"
          onClick={() => navigate("/")}
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
