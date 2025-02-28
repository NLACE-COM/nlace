
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="container max-w-6xl mx-auto py-8 px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center">
          {/* Logo para móvil */}
          <div className="flex items-bottom">
            <img src="https://nlace.com/hubfs/nlace_black.svg" alt="NLACE" className="h-12 brightness-0 invert" />
            <span className="text-2xl font-semibold text-white ml-3 py-0 my-[20px]">AI Studio</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={language} onValueChange={value => setLanguage(value as "es" | "en")}>
            <SelectTrigger className="w-36 bg-transparent border-[#4D4D4D] text-[#9E9E9E]">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <SelectValue>{language === "es" ? "Español" : "English"}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};
