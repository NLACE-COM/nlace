
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LoginForm from "@/components/login/LoginForm";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import PasswordResetDialog from "@/components/login/PasswordResetDialog";
import LoginDivider from "@/components/login/LoginDivider";
import SignupLink from "@/components/login/SignupLink";

const Index = () => {
  const { language } = useLanguage();
  const [openResetDialog, setOpenResetDialog] = useState(false);
  
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
            <LoginForm onOpenResetDialog={() => setOpenResetDialog(true)} />

            {/* Separator */}
            <LoginDivider />

            {/* Google login button */}
            <GoogleLoginButton />
          </div>
          
          {/* Sign up link */}
          <SignupLink />
          
          {/* Password Reset Dialog */}
          <PasswordResetDialog 
            open={openResetDialog} 
            onOpenChange={setOpenResetDialog} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
