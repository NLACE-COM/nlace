
import CompanySelector from "../CompanySelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader = ({ collapsed }: SidebarHeaderProps) => {
  const { t } = useLanguage();

  if (collapsed) return null;

  return (
    <>
      <div className="flex justify-center py-6">
        <img 
          src="https://nlace.com/hubfs/nlace_black.svg" 
          alt="NLACE Logo" 
          className="h-12"
        />
      </div>
      <div className="px-4 py-2 mb-6">
        <p className="text-sm font-medium text-muted-foreground ml-1 mb-2">{t("company")}</p>
        <CompanySelector />
      </div>
    </>
  );
};

export default SidebarHeader;
