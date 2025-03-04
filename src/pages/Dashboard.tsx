import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, BarChart3, BrainCircuit, ChevronDown, Clock, CreditCard, FileText, ListChecks, MessageSquare, Plus, RefreshCw, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCard } from "@/components/MetricsCard";
import AgentCard from "@/components/AgentCard";
import { agents, currentCompany, currentUser, getAgentsByCompany, tasks, usageMetrics, users } from "@/lib/data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("14d");
  const [chartMetric, setChartMetric] = useState("tokens");
  const companyAgents = currentCompany ? getAgentsByCompany(currentCompany.id) : [];
  const activeAgents = companyAgents.filter(agent => agent.status === "active");
  const timeRangeOptions = [{
    value: "7d",
    label: "7 días"
  }, {
    value: "14d",
    label: "14 días"
  }, {
    value: "30d",
    label: "30 días"
  }, {
    value: "90d",
    label: "90 días"
  }, {
    value: "1y",
    label: "1 año"
  }];
  const chartMetricOptions = [{
    value: "tokens",
    label: "Tokens utilizados"
  }, {
    value: "conversations",
    label: "Conversaciones"
  }, {
    value: "users",
    label: "Usuarios activos"
  }];
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
  const tokenPercentage = Math.round(totalTokensUsed / tokenLimit * 100);

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
    return [{
      date: "2024-04-01",
      count: 8
    }, {
      date: "2024-04-02",
      count: 10
    }, {
      date: "2024-04-03",
      count: 9
    }, {
      date: "2024-04-04",
      count: 12
    }, {
      date: "2024-04-05",
      count: 11
    }, {
      date: "2024-04-06",
      count: 7
    }, {
      date: "2024-04-07",
      count: 6
    }, {
      date: "2024-04-08",
      count: 13
    }, {
      date: "2024-04-09",
      count: 14
    }, {
      date: "2024-04-10",
      count: 16
    }, {
      date: "2024-04-11",
      count: 15
    }, {
      date: "2024-04-12",
      count: 14
    }, {
      date: "2024-04-13",
      count: 10
    }, {
      date: "2024-04-14",
      count: 8
    }];
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // Colores personalizados para el gráfico
  const chartColors = {
    area: "var(--primary)",
    areaFill: "url(#greenGradient)",
    stroke: "var(--primary)",
    grid: "rgba(20, 184, 116, 0.1)",
    tooltip: "rgba(20, 184, 116, 0.05)"
  };

  // Datos para los nuevos componentes
  const mostUsedAgents = [...companyAgents].sort((a, b) => (b.conversationCount || 0) - (a.conversationCount || 0)).slice(0, 5);
  const mostActiveUsers = [...users].filter(user => user.companyId === currentCompany?.id).sort((a, b) => (b.activityCount || 0) - (a.activityCount || 0)).slice(0, 5);
  
  return <div className="container py-6 max-w-7xl animate-fade-in">
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricsCard title="Conversaciones Abiertas" value={usageMetrics.activeConversations} icon={<MessageSquare className="h-4 w-4" />} trend={{
            value: 8,
            positive: true
          }} />
            <MetricsCard title="Usuarios Registrados" value={usageMetrics.totalUsers} icon={<Users className="h-4 w-4" />} trend={{
            value: 5,
            positive: true
          }} />
            <MetricsCard title="Tokens Utilizados" value={`${(totalTokensUsed / 1000).toFixed(1)}K`} description={`${tokenPercentage}% del límite`} icon={<CreditCard className="h-4 w-4" />} trend={{
            value: 12,
            positive: true
          }} />
            <MetricsCard title="Agentes Activos" value={activeAgents.length} icon={<Activity className="h-4 w-4" />} trend={{
            value: 2,
            positive: true
          }} />
          </div>

          {/* Gráfico principal */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Uso y Actividad</CardTitle>
                  <CardDescription>Análisis detallado del uso del sistema</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-full sm:w-[120px]">
                      <SelectValue placeholder="Periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRangeOptions.map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={chartMetric} onValueChange={setChartMetric}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartMetricOptions.map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="ml-auto sm:ml-0">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getChartData()}>
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} opacity={0.4} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      tick={{fontSize: 12}} 
                      stroke="var(--muted-foreground)"
                      axisLine={{ stroke: 'var(--border)' }}
                    />
                    <YAxis 
                      tickFormatter={formatChartYAxis} 
                      tick={{fontSize: 12}} 
                      stroke="var(--muted-foreground)"
                      axisLine={{ stroke: 'var(--border)' }}
                    />
                    <Tooltip 
                      formatter={value => [`${value} ${chartMetric === "tokens" ? "tokens" : chartMetric === "conversations" ? "conversaciones" : "usuarios"}`, ""]} 
                      labelFormatter={label => formatDate(label)}
                      contentStyle={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'var(--border)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem'
                      }}
                      itemStyle={{ color: 'var(--primary)' }}
                      labelStyle={{ fontWeight: 'bold', color: 'var(--foreground)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      name={chartMetric === "tokens" ? "Tokens" : chartMetric === "conversations" ? "Conversaciones" : "Usuarios"} 
                      stroke={chartColors.stroke} 
                      strokeWidth={2}
                      fill={chartColors.areaFill}
                      activeDot={{ 
                        r: 6, 
                        stroke: 'var(--background)', 
                        strokeWidth: 2,
                        fill: 'var(--primary)'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Agentes más usados */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Agentes más Usados</CardTitle>
                <CardDescription>Los agentes con mayor número de conversaciones</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6">
                  {mostUsedAgents.map(agent => <div key={agent.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                          {agent.avatar ? <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" /> : <BrainCircuit className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {agent.conversationCount || 0} conversaciones
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/agents")}>
                        Ver
                      </Button>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Usuarios más activos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Usuarios más Activos</CardTitle>
                <CardDescription>Por número de interacciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostActiveUsers.map(user => <div key={user.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-muted-foreground">{user.activityCount || 0} acciones</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{
                        width: `${Math.min(100, (user.activityCount || 0) / 100 * 100)}%`
                      }} />
                        </div>
                      </div>
                    </div>)}
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
            {companyAgents.map(agent => <AgentCard key={agent.id} agent={agent} onClick={() => navigate("/agents")} />)}
            
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Dashboard;
