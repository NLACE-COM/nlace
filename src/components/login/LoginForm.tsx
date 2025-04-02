import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
interface LoginFormProps {
  onOpenResetDialog: () => void;
}
const LoginForm = ({
  onOpenResetDialog
}: LoginFormProps) => {
  const {
    language
  } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    navigate("/dashboard");
  };
  return <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-brand-light">
            {language === "es" ? "Correo electrónico" : "Email"}
          </Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="email" type="email" placeholder="nombre@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 border-brand-light/20 text-brand-light focus:border-brand-orange bg-brand-light" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-brand-light">
              {language === "es" ? "Contraseña" : "Password"}
            </Label>
            <button type="button" onClick={onOpenResetDialog} className="text-sm text-brand-pink hover:underline">
              {language === "es" ? "¿Olvidaste la contraseña?" : "Forgot password?"}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="pl-10 pr-10 border-brand-light/20 text-brand-light focus:border-brand-orange bg-white" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        {language === "es" ? "Iniciar sesión" : "Sign in"}
      </Button>
    </form>;
};
export default LoginForm;