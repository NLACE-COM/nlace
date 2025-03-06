
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
            <div className="h-6 w-6 rounded bg-muted shrink-0 overflow-hidden">
              {selectedCompany?.logo ? (
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Building className="h-full w-full p-1 text-gray-500" />
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
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-popover">
        <Command>
          <CommandInput placeholder={t("searchCompany")} className="h-9" />
          <CommandEmpty>{t("noCompaniesFound")}</CommandEmpty>
          <CommandGroup>
            {companies.map((company) => (
              <CommandItem
                key={company.id}
                value={company.name}
                onSelect={() => handleCompanyChange(company)}
                className="flex items-center gap-2 py-2"
              >
                <div className="h-6 w-6 rounded bg-muted shrink-0 overflow-hidden">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building className="h-full w-full p-1 text-gray-500" />
                  )}
                </div>
                <span>{company.name}</span>
                {selectedCompany?.id === company.id && (
                  <Check className="ml-auto h-4 w-4 opacity-70" />
                )}
              </CommandItem>
            ))}
            <CommandItem
              value="add-new"
              onSelect={handleAddNewCompany}
              className="flex items-center gap-2 py-2 text-primary"
            >
              <Plus className="h-4 w-4" />
              <span>{t("addNewCompany")}</span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelector;
