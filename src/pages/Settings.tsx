
import { useState } from "react";
import { BrainCircuit, Building2, Globe, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { currentCompany, currentUser } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { t, language, setLanguage, country, setCountry } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [companyName, setCompanyName] = useState(currentCompany?.name || "");
  const [companyDescription, setCompanyDescription] = useState(
    currentCompany?.description || ""
  );
  const [userName, setUserName] = useState(currentUser?.name || "");
  const [userEmail, setUserEmail] = useState(currentUser?.email || "");

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [autoAssignmentEnabled, setAutoAssignmentEnabled] = useState(true);
  
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCountry, setSelectedCountry] = useState(country);

  const handleLanguageSave = () => {
    setLanguage(selectedLanguage);
    setCountry(selectedCountry);
    toast({
      title: t("saveChanges"),
      description: t("languageSettings") + " " + t("saveChanges").toLowerCase(),
    });
  };

  return (
    <div className="container py-6 max-w-5xl animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="heading-1">{t("settingsTitle")}</h1>
          <p className="text-muted-foreground">
            {t("settingsDescription")}
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            {t("profileTab")}
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            {t("companyTab")}
          </TabsTrigger>
          <TabsTrigger value="agents">
            <BrainCircuit className="h-4 w-4 mr-2" />
            {t("agentsTab")}
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            {t("languageTab")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t("profileInfo")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("updateProfileDetails")}
                  </p>
                </div>
                <Separator />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t("notifications")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("manageNotifications")}
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("enableNotifications")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("receiveAgentNotifications")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("emailNotifications")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("receiveEmailNotifications")}
                      </p>
                    </div>
                    <Switch
                      checked={emailNotificationsEnabled}
                      onCheckedChange={setEmailNotificationsEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              {t("saveChanges")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {t("companyInfo")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("updateCompanyDetails")}
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">{t("companyName")}</Label>
                    <Input
                      id="company-name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">{t("description")}</Label>
                    <Textarea
                      id="company-description"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              {t("saveChanges")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t("agentSettings")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("configureGlobalAgentSettings")}
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("autoAssignment")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("autoAssignTasks")}
                      </p>
                    </div>
                    <Switch
                      checked={autoAssignmentEnabled}
                      onCheckedChange={setAutoAssignmentEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              {t("saveChanges")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t("languageSettings")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("languageDescription")}
                  </p>
                </div>
                <Separator />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">{t("selectLanguage")}</Label>
                    <Select value={selectedLanguage} onValueChange={(value: "es" | "en") => setSelectedLanguage(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectLanguage")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">{t("spanish")}</SelectItem>
                        <SelectItem value="en">{t("english")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("selectCountry")}</Label>
                    <Select 
                      value={selectedCountry} 
                      onValueChange={(value: "españa" | "eeuu" | "méxico" | "colombia" | "argentina" | "chile" | "perú") => setSelectedCountry(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCountry")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="españa">{t("spain")}</SelectItem>
                        <SelectItem value="eeuu">{t("usa")}</SelectItem>
                        <SelectItem value="méxico">{t("mexico")}</SelectItem>
                        <SelectItem value="colombia">{t("colombia")}</SelectItem>
                        <SelectItem value="argentina">{t("argentina")}</SelectItem>
                        <SelectItem value="chile">{t("chile")}</SelectItem>
                        <SelectItem value="perú">{t("peru")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleLanguageSave}>
              <Save className="mr-2 h-4 w-4" />
              {t("saveChanges")}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
