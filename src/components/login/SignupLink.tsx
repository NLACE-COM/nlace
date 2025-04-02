
import { useLanguage } from "@/contexts/LanguageContext";

const SignupLink = () => {
  const { language } = useLanguage();
  
  return (
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
  );
};

export default SignupLink;
