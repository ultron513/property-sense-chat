
export type Agent = "issues" | "tenancy" | "router";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  image?: string | null;
  agentType?: Agent;
}

export interface AgentResponse {
  content: string;
  agentType: Agent;
}
