
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  ListChecks,
  MessageSquare,
  Plus,
  RefreshCw,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCard } from "@/components/MetricsCard";
import AgentCard from "@/components/AgentCard";
import { 
  agents, 
  currentCompany, 
  currentUser, 
  getAgentsByCompany, 
  tasks, 
  usageMetrics 
} from "@/lib/data";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("14d");
  const [chartMetric, setChartMetric] = useState("tokens");
  
  const companyAgents = currentCompany ? getAgentsByCompany(currentCompany.id) : [];
  const activeAgents = companyAgents.filter(agent => agent.status === "active");
  
  const timeRangeOptions = [
    { value: "7d", label: "7 días" },
    { value: "14d", label: "14 días" },
    { value: "30d", label: "30 días" },
    { value: "90d", label: "90 días" },
    { value: "1y", label: "1 año" },
  ];

  const chartMetricOptions = [
    { value: "tokens", label: "Tokens utilizados" },
    { value: "conversations", label: "Conversaciones" },
    { value: "users", label: "Usuarios activos" },
  ];

  const formatTime = (time: number): string => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  // Datos para gráficas
  const tokenUsageData = usageMetrics.tokenUsageByDay;
  const conversationsData = usageMetrics.conversationsByDay;
  
  // Calcular métricas importantes
  const totalTokensUsed = usageMetrics.totalTokensUsed;
  const tokenLimit = currentUser.tokenLimit;
  const tokenPercentage = Math.round((totalTokensUsed / tokenLimit) * 100);
  
  // Funciones de ayuda para gráficas
  const formatChartYAxis = (value: number): string => {
    if (chartMetric === "tokens") {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
    }
    return value.toString();
  };

  const getChartData = () => {
    if (chartMetric === "tokens") {
      return tokenUsageData;
    } else if (chartMetric === "conversations") {
      return conversationsData;
    }
    // Datos de ejemplo para usuarios activos
    return [
      { date: "2024-04-01", count: 8 },
      { date: "2024-04-02", count: 10 },
      { date: "2024-04-03", count: 9 },
      { date: "2024-04-04", count: 12 },
      { date: "2024-04-05", count: 11 },
      { date: "2024-04-06", count: 7 },
      { date: "2024-04-07", count: 6 },
      { date: "2024-04-08", count: 13 },
      { date: "2024-04-09", count: 14 },
      { date: "2024-04-10", count: 16 },
      { date: "2024-04-11", count: 15 },
      { date: "2024-04-12", count: 14 },
      { date: "2024-04-13", count: 10 },
      { date: "2024-04-14", count: 8 },
    ];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-blue-500";
      case "pending":
        return "text-amber-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

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

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricsCard
              title="Conversaciones Abiertas"
              value={usageMetrics.activeConversations}
              icon={<MessageSquare className="h-4 w-4" />}
              trend={{ value: 8, positive: true }}
            />
            <MetricsCard
              title="Usuarios Registrados"
              value={usageMetrics.totalUsers}
              icon={<Users className="h-4 w-4" />}
              trend={{ value: 5, positive: true }}
            />
            <MetricsCard
              title="Tokens Utilizados"
              value={`${(totalTokensUsed / 1000).toFixed(1)}K`}
              description={`${tokenPercentage}% del límite`}
              icon={<CreditCard className="h-4 w-4" />}
              trend={{ value: 12, positive: true }}
            />
            <MetricsCard
              title="Agentes Activos"
              value={activeAgents.length}
              icon={<Activity className="h-4 w-4" />}
              trend={{ value: 2, positive: true }}
            />
          </div>

          {/* Gráfico principal */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Uso y Actividad</CardTitle>
                  <CardDescription>Análisis detallado del uso del sistema</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRangeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={chartMetric} onValueChange={setChartMetric}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartMetricOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      tick={{ fontSize: 12 }} 
                    />
                    <YAxis 
                      tickFormatter={formatChartYAxis} 
                      tick={{ fontSize: 12 }} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} ${chartMetric === "tokens" ? "tokens" : chartMetric === "conversations" ? "conversaciones" : "usuarios"}`, ""]}
                      labelFormatter={(label) => formatDate(label)}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      name={chartMetric === "tokens" ? "Tokens" : chartMetric === "conversations" ? "Conversaciones" : "Usuarios"}
                      stroke="var(--primary)" 
                      fill="var(--primary)" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Tareas recientes */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tareas Recientes</CardTitle>
                <CardDescription>Últimas tareas de todos los agentes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6">
                  {tasks.slice(0, 5).map((task) => {
                    const agent = agents.find((a) => a.id === task.agent);
                    return (
                      <div
                        key={task.id}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-current shrink-0 animate-pulse" 
                               style={{ color: task.status === 'in-progress' ? '#3b82f6' : 'transparent' }} />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {agent?.name}
                              </span>
                              <span className="text-sm font-medium" 
                                    style={{ color: getTaskStatusColor(task.status) }}>
                                {task.status === 'completed' ? 'completada' : 
                                 task.status === 'in-progress' ? 'en progreso' : 
                                 task.status === 'pending' ? 'pendiente' : 'fallida'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Distribución de tokens por categoría */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Distribución de Tokens</CardTitle>
                <CardDescription>Por categoría de agente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: "Retail", value: 45200 },
                        { name: "Alimentos", value: 38800 },
                        { name: "Tecnología", value: 22100 },
                        { name: "Finanzas", value: 15600 },
                        { name: "Otros", value: 4100 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
                      <XAxis 
                        type="number" 
                        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString()} 
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={80} 
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${(value / 1000).toFixed(1)}K tokens`, ""]}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="var(--primary)" 
                        radius={[0, 4, 4, 0]} 
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold">Tus Agentes</h2>
              <p className="text-muted-foreground">
                {companyAgents.length} agentes configurados para{" "}
                {currentCompany?.name || "tu empresa"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => navigate("/agents")}
              />
            ))}
            <Card className="flex items-center justify-center h-full min-h-[250px] border-dashed animate-fade-in">
              <Button
                variant="ghost"
                className="h-full w-full flex flex-col gap-2 p-6"
                onClick={() => navigate("/agents")}
              >
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-lg font-medium">Añadir Nuevo Agente</span>
                <p className="text-sm text-muted-foreground">
                  Configura un nuevo agente de IA para tus necesidades específicas
                </p>
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
