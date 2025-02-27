
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CompanySelector from "./CompanySelector";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      name: "Panel Principal",
      icon: <LayoutDashboard className="h-5 w-5" />,
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
          "fixed top-0 left-0 z-40 w-72 h-full border-r bg-background transition-transform duration-300 ease-in-out transform md:translate-x-0 pt-16",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto py-6 px-4">
          <div className="md:hidden absolute top-4 right-4">
            <button
              onClick={onClose}
              className="rounded-full h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <div className="mb-8">
            <CompanySelector />
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "nav-link hover:bg-muted",
                    isActive && "nav-link active"
                  )
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
