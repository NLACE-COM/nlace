
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LoginForm from "@/components/login/LoginForm";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import PasswordResetDialog from "@/components/login/PasswordResetDialog";
import LoginDivider from "@/components/login/LoginDivider";
import SignupLink from "@/components/login/SignupLink";

const Index = () => {
  const {
    language
  } = useLanguage();
  const [openResetDialog, setOpenResetDialog] = useState(false);

  return <div className="min-h-screen w-full flex flex-col bg-brand-dark">
      {/* Columna de la izquierda - Imagen */}
      <div className="md:hidden h-[20vh] relative overflow-hidden">
        <img src="/lovable-uploads/4e8356c4-36c0-494b-98ea-adfc53608356.png" alt="Modern art with statue" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1 h-[80vh] md:h-auto">
        {/* Columna de la izquierda - Imagen (en desktop) */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img src="/lovable-uploads/4e8356c4-36c0-494b-98ea-adfc53608356.png" alt="Modern art with statue" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
        </div>
        
        {/* Columna de la derecha - Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-brand-blue flex-1">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2 bg-brand-dark text-brand-light px-4 py-2 inline-block rounded font-heading">NLACE AI Studio</h1>
              <p className="text-brand-light/80 font-sans">
                {language === "es" ? "Inicia sesión para acceder a tus agentes de IA" : "Sign in to access your AI agents"}
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
            <PasswordResetDialog open={openResetDialog} onOpenChange={setOpenResetDialog} />
          </div>
        </div>
      </div>
    </div>;
};

export default Index;
