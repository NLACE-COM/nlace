
import { useLanguage } from "@/contexts/LanguageContext";

const LoginDivider = () => {
  const { language } = useLanguage();
  
  return (
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
  );
};

export default LoginDivider;
