
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import translations from "../translations";

type Language = "es" | "en";
type Country = "españa" | "eeuu" | "méxico" | "colombia" | "argentina" | "chile" | "perú";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  country: Country;
  setCountry: (country: Country) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "es";
  });
  
  const [country, setCountryState] = useState<Country>(() => {
    const savedCountry = localStorage.getItem("country");
    return (savedCountry as Country) || "españa";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const setCountry = (country: Country) => {
    setCountryState(country);
    localStorage.setItem("country", country);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, country, setCountry, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
