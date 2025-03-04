
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrainCircuit } from "lucide-react";
import { Agent, User } from "@/lib/types";
import { useNavigate } from "react-router-dom";

interface TopPerformersProps {
  mostUsedAgents: Agent[];
  mostActiveUsers: User[];
}

const TopPerformers = ({ mostUsedAgents, mostActiveUsers }: TopPerformersProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Agentes más usados */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Agentes más Usados</CardTitle>
          <CardDescription>Los agentes con mayor número de conversaciones</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-6">
            {mostUsedAgents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                    {agent.avatar ? (
                      <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                    ) : (
                      <BrainCircuit className="h-4 w-4" />
                    )}
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
              </div>
            ))}
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
            {mostActiveUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3">
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
                    <div 
                      className="h-full bg-primary" 
                      style={{
                        width: `${Math.min(100, (user.activityCount || 0) / 100 * 100)}%`
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformers;
