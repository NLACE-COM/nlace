
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  Clock,
  FileText,
  LayoutGrid,
  ListChecks,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCard } from "@/components/MetricsCard";
import AgentCard from "@/components/AgentCard";
import { agents, currentCompany, getAgentsByCompany, tasks } from "@/lib/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const companyAgents = currentCompany ? getAgentsByCompany(currentCompany.id) : [];
  const activeAgents = companyAgents.filter(agent => agent.status === "active");
  
  const recentTasks = tasks.slice(0, 5);

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
          <h1 className="heading-1">Panel Principal</h1>
          <p className="text-muted-foreground">
            Gestiona tus agentes de IA y monitorea el rendimiento
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
              title="Total Agentes"
              value={companyAgents.length}
              icon={<BrainCircuit className="h-4 w-4" />}
              trend={{ value: 12, positive: true }}
            />
            <MetricsCard
              title="Agentes Activos"
              value={activeAgents.length}
              icon={<Activity className="h-4 w-4" />}
              trend={{ value: 8, positive: true }}
            />
            <MetricsCard
              title="Tareas Completadas"
              value={245}
              icon={<ListChecks className="h-4 w-4" />}
              trend={{ value: 5, positive: true }}
            />
            <MetricsCard
              title="Horas Ahorradas"
              value="124h"
              icon={<Clock className="h-4 w-4" />}
              trend={{ value: 18, positive: true }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tareas Recientes</CardTitle>
                <CardDescription>Últimas tareas de todos los agentes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6">
                  {recentTasks.map((task) => {
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

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Acciones Rápidas</CardTitle>
                <CardDescription>Operaciones comunes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/agents")}
                  >
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    <span>Gestionar Agentes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/knowledge")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Base de Conocimiento</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/analytics")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Análisis</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/users")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Miembros del Equipo</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="heading-3">Tus Agentes</h2>
              <p className="text-muted-foreground">
                {companyAgents.length} agentes configurados para{" "}
                {currentCompany?.name || "tu empresa"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <LayoutGrid className="h-4 w-4 mr-1" />
                Cuadrícula
              </Button>
              <Button variant="outline" size="sm">
                <ListChecks className="h-4 w-4 mr-1" />
                Lista
              </Button>
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
