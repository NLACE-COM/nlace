
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
// Importamos CreateUser directamente con ruta relativa
import CreateUser from "./pages/CreateUser";
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
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/agents" element={<Agents />} />
                  <Route path="/agents/create" element={<CreateAgent />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/create" element={<CreateUser />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
              <Toaster />
            </Router>
          </QueryClientProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
