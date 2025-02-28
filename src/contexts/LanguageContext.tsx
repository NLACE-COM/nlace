
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "es" | "en";
type Country = "españa" | "eeuu" | "méxico" | "colombia" | "argentina" | "chile" | "perú";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  country: Country;
  setCountry: (country: Country) => void;
  t: (key: string) => string;
}

// Traducciones
const translations = {
  es: {
    // Navbar
    "profile": "Perfil",
    "settings": "Configuración",
    "logout": "Cerrar sesión",
    "notifications": "Notificaciones",
    "markAllAsRead": "Marcar todas como leídas",
    "noNotifications": "No tienes notificaciones",
    "viewAllNotifications": "Ver todas las notificaciones",
    
    // Sidebar
    "dashboard": "Panel Principal",
    "agents": "Agentes",
    "chat": "Chat",
    "knowledge": "Conocimiento",
    "integrations": "Integraciones",
    "users": "Usuarios",
    "company": "Empresa",
    "addNewCompany": "Agregar nueva empresa",
    "searchCompany": "Buscar empresa...",
    "noCompaniesFound": "No se encontraron empresas.",
    
    // Settings
    "settingsTitle": "Configuración",
    "settingsDescription": "Gestiona la configuración de tu cuenta y empresa",
    "profileTab": "Perfil",
    "companyTab": "Empresa",
    "agentsTab": "Agentes",
    "languageTab": "Idioma",
    "profileInfo": "Información del Perfil",
    "updateProfileDetails": "Actualiza los detalles de tu cuenta",
    "name": "Nombre",
    "email": "Email",
    "notifications": "Notificaciones",
    "manageNotifications": "Gestiona cómo recibes las notificaciones",
    "enableNotifications": "Activar Notificaciones",
    "receiveAgentNotifications": "Recibe notificaciones sobre la actividad de los agentes",
    "emailNotifications": "Notificaciones por Email",
    "receiveEmailNotifications": "Recibe notificaciones por email para eventos importantes",
    "saveChanges": "Guardar Cambios",
    "companyInfo": "Información de la Empresa",
    "updateCompanyDetails": "Actualiza los detalles de tu empresa",
    "companyName": "Nombre de la Empresa",
    "description": "Descripción",
    "agentSettings": "Configuración de Agentes",
    "configureGlobalAgentSettings": "Configura ajustes globales para los agentes",
    "autoAssignment": "Asignación Automática",
    "autoAssignTasks": "Asigna automáticamente nuevas tareas a los agentes disponibles",
    "languageSettings": "Configuración de Idioma",
    "selectLanguage": "Selecciona tu idioma",
    "selectCountry": "Selecciona tu país",
    "languageDescription": "Selecciona tu idioma y país preferidos",
    "spanish": "Español",
    "english": "Inglés",
    "spain": "España",
    "usa": "Estados Unidos",
    "mexico": "México",
    "colombia": "Colombia",
    "argentina": "Argentina",
    "chile": "Chile",
    "peru": "Perú",
    
    // General
    "cancel": "Cancelar",
    "save": "Guardar",
    "loading": "Cargando..."
  },
  en: {
    // Navbar
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout",
    "notifications": "Notifications",
    "markAllAsRead": "Mark all as read",
    "noNotifications": "You have no notifications",
    "viewAllNotifications": "View all notifications",
    
    // Sidebar
    "dashboard": "Dashboard",
    "agents": "Agents",
    "chat": "Chat",
    "knowledge": "Knowledge",
    "integrations": "Integrations",
    "users": "Users",
    "company": "Company",
    "addNewCompany": "Add new company",
    "searchCompany": "Search company...",
    "noCompaniesFound": "No companies found.",
    
    // Settings
    "settingsTitle": "Settings",
    "settingsDescription": "Manage your account and company settings",
    "profileTab": "Profile",
    "companyTab": "Company",
    "agentsTab": "Agents",
    "languageTab": "Language",
    "profileInfo": "Profile Information",
    "updateProfileDetails": "Update your account details",
    "name": "Name",
    "email": "Email",
    "notifications": "Notifications",
    "manageNotifications": "Manage how you receive notifications",
    "enableNotifications": "Enable Notifications",
    "receiveAgentNotifications": "Receive notifications about agent activity",
    "emailNotifications": "Email Notifications",
    "receiveEmailNotifications": "Receive email notifications for important events",
    "saveChanges": "Save Changes",
    "companyInfo": "Company Information",
    "updateCompanyDetails": "Update your company details",
    "companyName": "Company Name",
    "description": "Description",
    "agentSettings": "Agent Settings",
    "configureGlobalAgentSettings": "Configure global settings for agents",
    "autoAssignment": "Auto Assignment",
    "autoAssignTasks": "Automatically assign new tasks to available agents",
    "languageSettings": "Language Settings",
    "selectLanguage": "Select your language",
    "selectCountry": "Select your country",
    "languageDescription": "Select your preferred language and country",
    "spanish": "Spanish",
    "english": "English",
    "spain": "Spain",
    "usa": "United States",
    "mexico": "Mexico",
    "colombia": "Colombia",
    "argentina": "Argentina",
    "chile": "Chile",
    "peru": "Peru",
    
    // General
    "cancel": "Cancel",
    "save": "Save",
    "loading": "Loading..."
  }
};

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
