
import { useState } from "react";
import { BrainCircuit, Building2, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { currentCompany, currentUser } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const Settings = () => {
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

  return (
    <div className="container py-6 max-w-5xl animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="heading-1">Configuración</h1>
          <p className="text-muted-foreground">
            Gestiona la configuración de tu cuenta y empresa
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="agents">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Agentes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Información del Perfil</h3>
                  <p className="text-sm text-muted-foreground">
                    Actualiza los detalles de tu cuenta
                  </p>
                </div>
                <Separator />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                  <h3 className="text-xl font-semibold mb-1">Notificaciones</h3>
                  <p className="text-sm text-muted-foreground">
                    Gestiona cómo recibes las notificaciones
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activar Notificaciones</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones sobre la actividad de los agentes
                      </p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones por Email</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones por email para eventos importantes
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
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Información de la Empresa
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Actualiza los detalles de tu empresa
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nombre de la Empresa</Label>
                    <Input
                      id="company-name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Descripción</Label>
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
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Configuración de Agentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Configura ajustes globales para los agentes
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Asignación Automática</p>
                      <p className="text-sm text-muted-foreground">
                        Asigna automáticamente nuevas tareas a los agentes disponibles
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
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
