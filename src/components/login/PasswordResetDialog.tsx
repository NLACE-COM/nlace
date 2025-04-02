
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordResetDialog = ({ open, onOpenChange }: PasswordResetDialogProps) => {
  const { language } = useLanguage();
  const [resetEmail, setResetEmail] = useState("");
  
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de restablecimiento de contraseña
    onOpenChange(false);
    // Mostrar un mensaje de éxito
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};

export default PasswordResetDialog;
