
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const { language } = useLanguage();

  return (
    <header className="container max-w-6xl mx-auto py-8 px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-bottom">
            <img src="https://nlace.com/hubfs/nlace_black.svg" alt="NLACE" className="h-12 brightness-0 invert" />
            <span className="text-2xl font-semibold text-white ml-3 py-0 my-[20px]">AI Studio</span>
          </div>
        </div>
      </div>
    </header>
  );
};
