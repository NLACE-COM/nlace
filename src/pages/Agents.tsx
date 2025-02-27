
import { useState } from "react";
import {
  BrainCircuit,
  Filter,
  LayoutGrid,
  ListChecks,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AgentCard from "@/components/AgentCard";
import { currentCompany, getAgentsByCompany } from "@/lib/data";
import { Agent, AgentType } from "@/lib/types";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const companyAgents = currentCompany
    ? getAgentsByCompany(currentCompany.id)
    : [];

  const filteredAgents = companyAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? agent.type === typeFilter : true;
    const matchesStatus = statusFilter ? agent.status === statusFilter : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  const agentTypes: AgentType[] = [
    "data-analysis",
    "content-creation",
    "document-review",
    "customer-support",
    "research",
    "custom",
  ];

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-1">Agents</h1>
          <p className="text-muted-foreground">
            Configure and manage your AI agents
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Agent
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Types</SelectItem>
                  {agentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="configuring">Configuring</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <ListChecks className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No agents found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || typeFilter || statusFilter
              ? "Try adjusting your filters or search term"
              : "Create your first AI agent to get started"}
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Agent
          </Button>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          <div
            className={
              view === "grid"
                ? "flex items-center justify-center min-h-[250px] border border-dashed rounded-lg animate-fade-in"
                : "flex items-center justify-center p-6 border border-dashed rounded-lg animate-fade-in"
            }
          >
            <Button variant="ghost" className="h-full w-full flex flex-col gap-2 p-6">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-lg font-medium">Add New Agent</span>
              <p className="text-sm text-muted-foreground">
                Configure a new AI agent for your specific needs
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
