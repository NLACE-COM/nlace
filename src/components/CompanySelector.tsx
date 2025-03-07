
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { companies } from "@/lib/data";
import { Company } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const CompanySelector = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(
    companies[0]
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company);
    setOpen(false);
    
    toast({
      title: t("companyChanged"),
      description: `${t("switchedTo")} ${company.name}`,
      duration: 3000,
    });
  };

  const handleAddNewCompany = () => {
    toast({
      title: t("featureInDevelopment"),
      description: t("comingSoon"),
      duration: 3000,
    });
    setOpen(false);
  };

  const handleImageError = (companyId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [companyId]: true
    }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-muted bg-background hover:bg-muted/50 h-auto py-3"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="h-6 w-6 rounded bg-muted shrink-0 overflow-hidden flex items-center justify-center">
              {selectedCompany?.logo && !imageErrors[selectedCompany.id] ? (
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="h-full w-full object-contain"
                  onError={() => handleImageError(selectedCompany.id)}
                />
              ) : (
                <Building className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <span className="truncate font-medium">
              {selectedCompany?.name || t("selectCompany")}
            </span>
          </div>
          {open ? (
            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0" 
          style={{ backgroundColor: 'white', zIndex: 100 }}
          align="start"
        >
          <div className="bg-white rounded-md shadow-md border border-gray-200">
            <div className="p-2">
              <div className="relative">
                <input
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t("searchCompany")}
                />
              </div>
            </div>
            <div className="py-2 max-h-[300px] overflow-auto">
              {companies.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {t("noCompaniesFound")}
                </div>
              ) : (
                companies.map((company) => (
                  <div
                    key={company.id}
                    className={`px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-muted ${
                      selectedCompany?.id === company.id ? "bg-muted/50" : ""
                    }`}
                    onClick={() => handleCompanyChange(company)}
                  >
                    <div className="h-6 w-6 rounded bg-muted shrink-0 overflow-hidden flex items-center justify-center">
                      {company.logo && !imageErrors[company.id] ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full object-contain"
                          onError={() => handleImageError(company.id)}
                        />
                      ) : (
                        <Building className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <span>{company.name}</span>
                    {selectedCompany?.id === company.id && (
                      <Check className="ml-auto h-4 w-4 opacity-70" />
                    )}
                  </div>
                ))
              )}
              <div
                className="px-3 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-muted text-primary"
                onClick={handleAddNewCompany}
              >
                <Plus className="h-4 w-4" />
                <span>{t("addNewCompany")}</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default CompanySelector;
