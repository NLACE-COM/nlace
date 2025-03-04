
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentCompany, currentUser, getAgentsByCompany, usageMetrics, users } from "@/lib/data";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import ChartSection from "@/components/dashboard/ChartSection";
import TopPerformers from "@/components/dashboard/TopPerformers";
import AgentsTab from "@/components/dashboard/AgentsTab";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get company data
  const companyAgents = currentCompany ? getAgentsByCompany(currentCompany.id) : [];
  const activeAgents = companyAgents.filter(agent => agent.status === "active");
  
  // Chart options
  const timeRangeOptions = [
    { value: "7d", label: "7 días" },
    { value: "14d", label: "14 días" },
    { value: "30d", label: "30 días" },
    { value: "90d", label: "90 días" },
    { value: "1y", label: "1 año" }
  ];
  
  const chartMetricOptions = [
    { value: "tokens", label: "Tokens utilizados" },
    { value: "conversations", label: "Conversaciones" },
    { value: "users", label: "Usuarios activos" }
  ];

  // Data for charts
  const tokenUsageData = usageMetrics.tokenUsageByDay;
  const conversationsData = usageMetrics.conversationsByDay;

  // Calculate important metrics
  const totalTokensUsed = usageMetrics.totalTokensUsed;
  const tokenLimit = currentUser.tokenLimit;

  // Data for the new components
  const mostUsedAgents = [...companyAgents]
    .sort((a, b) => (b.conversationCount || 0) - (a.conversationCount || 0))
    .slice(0, 5);
  
  const mostActiveUsers = [...users]
    .filter(user => user.companyId === currentCompany?.id)
    .sort((a, b) => (b.activityCount || 0) - (a.activityCount || 0))
    .slice(0, 5);
  
  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Panel Principal</h1>
          <p className="text-muted-foreground">
            Analiza el rendimiento y gestiona tus agentes de IA
          </p>
        </div>
        <Button onClick={() => navigate("/agents")}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Agente
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Metrics Overview */}
          <MetricsOverview 
            activeConversations={usageMetrics.activeConversations}
            totalUsers={usageMetrics.totalUsers}
            totalTokensUsed={totalTokensUsed}
            tokenLimit={tokenLimit}
            activeAgentsCount={activeAgents.length}
          />

          {/* Chart Section */}
          <ChartSection 
            tokenUsageData={tokenUsageData}
            conversationsData={conversationsData}
            timeRangeOptions={timeRangeOptions}
            chartMetricOptions={chartMetricOptions}
          />

          {/* Top Performers */}
          <TopPerformers 
            mostUsedAgents={mostUsedAgents}
            mostActiveUsers={mostActiveUsers}
          />
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <AgentsTab 
            agents={companyAgents}
            companyName={currentCompany?.name}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
