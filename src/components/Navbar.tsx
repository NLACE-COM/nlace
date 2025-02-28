
import { useState, useEffect } from "react";
import { ChevronDown, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@/lib/data";
import NotificationsPopover from "./NotificationsPopover";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  // Detectar si el sidebar está colapsado usando una clase en el body
  useEffect(() => {
    const checkSidebarState = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        setIsSidebarCollapsed(mainElement.className.includes('md:pl-20'));
      }
    };

    checkSidebarState();
    // Crear un observer para detectar cambios en las clases
    const observer = new MutationObserver(checkSidebarState);
    const main = document.querySelector('main');
    if (main) {
      observer.observe(main, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    toast({
      title: "Cerrar sesión",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 px-4 md:px-6 border-b bg-background/80 backdrop-blur-md">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {isSidebarCollapsed ? (
                <img
                  src="/lovable-uploads/644cd2ec-220b-45d7-b003-72e91fe020d3.png"
                  alt="NLACE"
                  className="h-8 md:h-10"
                />
              ) : (
                <img
                  src="/lovable-uploads/ce52e81f-b486-4b1c-a6db-ed96bebf8482.png"
                  alt="NLACE AI Studio"
                  className="h-8 md:h-10"
                />
              )}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NotificationsPopover />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 flex items-center gap-2 rounded-full"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden md:flex flex-col items-start text-sm">
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {currentUser.role === 'admin' ? 'Administrador' : 
                     currentUser.role === 'manager' ? 'Gerente' : 'Usuario'}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1 z-40">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
