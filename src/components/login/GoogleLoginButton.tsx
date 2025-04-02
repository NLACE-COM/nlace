
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const GoogleLoginButton = () => {
  const {
    language
  } = useLanguage();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Aquí iría la lógica de autenticación con Google
    navigate("/dashboard");
  };

  return <Button variant="outline" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 h-11 border-brand-light/20 hover:bg-brand-orange/10 text-brand-dark">
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" className="h-5" />
      <span>
        {language === "es" ? "Continuar con Google" : "Continue with Google"}
      </span>
    </Button>;
};

export default GoogleLoginButton;
