
import { useNavigate } from "react-router-dom";
import AgentCard from "@/components/AgentCard";
import { Agent } from "@/lib/types";

interface AgentsTabProps {
  agents: Agent[];
  companyName?: string;
}

const AgentsTab = ({ agents, companyName }: AgentsTabProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold">Tus Agentes</h2>
          <p className="text-muted-foreground">
            {agents.length} agentes configurados para{" "}
            {companyName || "tu empresa"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} onClick={() => navigate("/agents")} />
        ))}
      </div>
    </div>
  );
};

export default AgentsTab;
