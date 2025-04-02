
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AtSign, Eye, EyeOff, Lock, Mail } from "lucide-react";

const Index = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    navigate("/dashboard");
  };
  
  const handleGoogleLogin = () => {
    // Aquí iría la lógica de autenticación con Google
    navigate("/dashboard");
  };
  
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de restablecimiento de contraseña
    setOpenResetDialog(false);
    // Mostrar un mensaje de éxito
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-brand-dark">
      {/* Columna de la izquierda - Imagen */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <img 
          src="/lovable-uploads/4e8356c4-36c0-494b-98ea-adfc53608356.png" 
          alt="Modern art with statue" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
      </div>
      
      {/* Columna de la derecha - Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-brand-orange mb-2">NLACE AI Studio</h1>
            <p className="text-brand-light/80">
              {language === "es" 
                ? "Inicia sesión para acceder a tus agentes de IA" 
                : "Sign in to access your AI agents"}
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Email login form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-light">
                    {language === "es" ? "Correo electrónico" : "Email"}
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="nombre@ejemplo.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-10 bg-brand-dark border-brand-light/20 text-brand-light focus:border-brand-orange" 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-brand-light">
                      {language === "es" ? "Contraseña" : "Password"}
                    </Label>
                    <Dialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
                      <DialogTrigger asChild>
                        <button type="button" className="text-sm text-brand-pink hover:underline">
                          {language === "es" ? "¿Olvidaste la contraseña?" : "Forgot password?"}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-brand-dark text-brand-light border-brand-light/20">
                        <DialogHeader>
                          <DialogTitle className="text-brand-light">
                            {language === "es" ? "Restablecer contraseña" : "Reset password"}
                          </DialogTitle>
                          <DialogDescription className="text-brand-light/70">
                            {language === "es" 
                              ? "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña." 
                              : "Enter your email and we'll send you a link to reset your password."}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="reset-email" className="text-brand-light">
                              {language === "es" ? "Correo electrónico" : "Email"}
                            </Label>
                            <Input 
                              id="reset-email" 
                              type="email" 
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              className="bg-brand-dark border-brand-light/20 text-brand-light focus:border-brand-orange"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/80">
                            {language === "es" ? "Enviar enlace" : "Send reset link"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="pl-10 pr-10 bg-brand-dark border-brand-light/20 text-brand-light focus:border-brand-orange" 
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                {language === "es" ? "Iniciar sesión" : "Sign in"}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-brand-light/20"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-brand-dark px-2 text-brand-light/60">
                  {language === "es" ? "O continuar con" : "Or continue with"}
                </span>
              </div>
            </div>

            {/* Google login button */}
            <Button 
              variant="outline" 
              onClick={handleGoogleLogin} 
              className="w-full flex items-center justify-center gap-2 h-11 border-brand-light/20 text-brand-light hover:bg-brand-light/10"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google Logo" 
                className="h-5"
              />
              <span>
                {language === "es" ? "Continuar con Google" : "Continue with Google"}
              </span>
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-brand-light/70">
            <p>
              {language === "es" 
                ? "¿No tienes una cuenta? " 
                : "Don't have an account? "}
              <a href="#" className="font-medium text-brand-pink hover:underline">
                {language === "es" ? "Regístrate" : "Sign up"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
