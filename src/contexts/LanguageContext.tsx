
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

// Modificado para devolver español como idioma predeterminado
const getDefaultLanguage = (): Language => {
  // Intentar obtener el idioma guardado
  const savedLanguage = localStorage.getItem("language") as Language;
  if (savedLanguage) return savedLanguage;

  // Por defecto, devolvemos español en lugar de detectar el idioma del navegador
  return 'es';
};

const getDefaultCountry = (language: Language): Country => {
  // Intentar obtener el país guardado
  const savedCountry = localStorage.getItem("country") as Country;
  if (savedCountry) return savedCountry;

  // Asignar país por defecto según el idioma
  return language === 'es' ? 'españa' : 'eeuu';
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getDefaultLanguage);
  const [country, setCountryState] = useState<Country>(() => getDefaultCountry(getDefaultLanguage()));

  // Al iniciar la aplicación, asegurarse de que el idioma esté establecido en español
  useEffect(() => {
    if (language !== 'es') {
      setLanguage('es');
    }
  }, []);

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
