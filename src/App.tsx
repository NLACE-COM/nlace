
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import Agents from "@/pages/Agents";
import CreateAgent from "@/pages/CreateAgent";
import Knowledge from "@/pages/Knowledge";
import Integrations from "@/pages/Integrations";
import Chat from "@/pages/Chat";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import CreateUser from "./pages/CreateUser";
import Index from "./pages/Index";
import { LanguageProvider } from "./contexts/LanguageContext";

// Inicializar el queryClient para React Query
const queryClient = new QueryClient();

// Layout principal
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            sidebarCollapsed ? "md:pl-20" : "md:pl-72"
          }`}
        >
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Layout para la página de inicio (sin sidebar ni navbar)
const HomeLayout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                {/* Ruta de inicio con layout especial */}
                <Route path="/" element={<HomeLayout><Index /></HomeLayout>} />
                
                {/* Rutas con layout principal (con sidebar) */}
                <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/agents" element={<AppLayout><Agents /></AppLayout>} />
                <Route path="/agents/create" element={<AppLayout><CreateAgent /></AppLayout>} />
                <Route path="/chat" element={<AppLayout><Chat /></AppLayout>} />
                <Route path="/knowledge" element={<AppLayout><Knowledge /></AppLayout>} />
                <Route path="/integrations" element={<AppLayout><Integrations /></AppLayout>} />
                <Route path="/users" element={<AppLayout><Users /></AppLayout>} />
                <Route path="/users/create" element={<AppLayout><CreateUser /></AppLayout>} />
                <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
                <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
              </Routes>
              <Toaster />
            </Router>
          </QueryClientProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
