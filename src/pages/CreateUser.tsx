
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentCompany } from "@/lib/data";

const CreateUser = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    tokenLimit: 50000,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío de datos
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/users");
      // Aquí se podría añadir una notificación de éxito
    }, 1000);
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/users")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="heading-1">Añadir Usuario</h1>
          <p className="text-muted-foreground">
            Crea un nuevo usuario para {currentCompany?.name || "tu empresa"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>
                Ingresa los datos básicos del nuevo usuario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Nombre del usuario"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol de usuario</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Shield className="h-4 w-4" />
                  </div>
                  <Select
                    name="role"
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>
                Establece los límites y permisos del usuario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenLimit">Límite de tokens</Label>
                <Input
                  id="tokenLimit"
                  name="tokenLimit"
                  type="number"
                  value={formData.tokenLimit}
                  onChange={handleChange}
                  min="1000"
                  step="1000"
                />
                <p className="text-xs text-muted-foreground">
                  Número máximo de tokens que el usuario puede utilizar
                </p>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Información adicional sobre este usuario..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/users")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Usuario"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
