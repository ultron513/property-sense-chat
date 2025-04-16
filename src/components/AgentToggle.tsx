
import React from "react";
import { Agent } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Home, HelpCircle } from "lucide-react";

interface AgentToggleProps {
  currentAgent: Agent;
  onSwitchAgent: (agent: Agent) => void;
}

const AgentToggle: React.FC<AgentToggleProps> = ({ currentAgent, onSwitchAgent }) => {
  return (
    <ToggleGroup type="single" value={currentAgent} className="bg-realEstate-secondary/20 rounded-md">
      <ToggleGroupItem 
        value="issues" 
        aria-label="Property Issues Agent"
        className={`flex items-center gap-1 px-3 py-1 text-sm ${
          currentAgent === "issues" 
            ? "bg-white text-realEstate-primary" 
            : "text-white hover:bg-realEstate-secondary/50"
        }`}
        onClick={() => onSwitchAgent("issues")}
      >
        <Home size={16} />
        <span className="hidden md:inline">Issues</span>
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="tenancy" 
        aria-label="Tenancy FAQ Agent"
        className={`flex items-center gap-1 px-3 py-1 text-sm ${
          currentAgent === "tenancy" 
            ? "bg-white text-realEstate-secondary" 
            : "text-white hover:bg-realEstate-secondary/50"
        }`}
        onClick={() => onSwitchAgent("tenancy")}
      >
        <HelpCircle size={16} />
        <span className="hidden md:inline">Tenancy</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default AgentToggle;
