
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CompanySelector from "./CompanySelector";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      path: "/dashboard",
      name: "Panel Principal",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: "/chat",
      name: "Chat",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      path: "/agents",
      name: "Agentes",
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      path: "/knowledge",
      name: "Base de Conocimiento",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      path: "/analytics",
      name: "Análisis",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      path: "/users",
      name: "Usuarios",
      icon: <Users className="h-5 w-5" />,
    },
    {
      path: "/settings",
      name: "Configuración",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full border-r bg-background transition-all duration-300 ease-in-out transform md:translate-x-0 pt-16",
          collapsed ? "w-20" : "w-72",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto py-6 px-4 relative">
          <div className="md:hidden absolute top-4 right-4">
            <button
              onClick={onClose}
              className="rounded-full h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 -right-4 z-50 h-8 w-8 rounded-full border bg-background shadow-md hidden md:flex"
            onClick={toggleCollapse}
          >
            {collapsed ? 
              <ChevronRight className="h-4 w-4" /> : 
              <ChevronLeft className="h-4 w-4" />
            }
          </Button>

          <div className={cn("mb-8", collapsed && "flex justify-center")}>
            {collapsed ? (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <CompanySelector />
            )}
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "nav-link hover:bg-muted flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                    collapsed && "justify-center px-2",
                    isActive && "nav-link active bg-secondary text-primary font-medium"
                  )
                }
              >
                {item.icon}
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
