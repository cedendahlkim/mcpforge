// MCP Forge - Shared MCP Types
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, MCPParameter>;
    required?: string[];
  };
}

export interface MCPParameter {
  type: "string" | "number" | "boolean" | "array" | "object";
  description: string;
  enum?: string[];
  default?: any;
}

export interface MCPServer {
  name: string;
  version: string;
  description: string;
  tools: MCPTool[];
  resources?: MCPResource[];
}

export interface MCPResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

export interface MCPNode {
  id: string;
  type: "tool" | "input" | "output" | "condition";
  position: { x: number; y: number };
  data: {
    label: string;
    tool?: MCPTool;
    config?: Record<string, any>;
  };
}

export interface MCPFlow {
  nodes: MCPNode[];
  edges: MCPEdge[];
}

export interface MCPEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface GeneratedCode {
  language: "typescript" | "python" | "go";
  code: string;
  dependencies: string[];
  instructions: string;
}
