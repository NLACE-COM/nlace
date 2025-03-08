
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { integrationsList } from "@/components/integrations/integrationData";
import { formatDate, sortIntegrations } from "@/components/integrations/utils";
import SearchBar from "@/components/integrations/SearchBar";
import IntegrationList from "@/components/integrations/IntegrationList";

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  // Filtramos las integraciones según la búsqueda
  const filteredIntegrations = integrationsList.filter((integration) => {
    return integration.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Ordenamos las integraciones
  const sortedIntegrations = sortIntegrations(filteredIntegrations);

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("integrations")}</h1>
          <p className="text-muted-foreground">
            Conecta aplicaciones externas para ampliar las capacidades de tus agentes
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>

      <IntegrationList 
        integrations={sortedIntegrations} 
        formatDate={formatDate}
      />
    </div>
  );
};

export default Integrations;
