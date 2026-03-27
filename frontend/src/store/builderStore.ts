import { create } from 'zustand';
import type { MCPNode, MCPEdge, MCPTool } from '../../../shared/types/mcp';

interface BuilderStore {
  // Flow data
  nodes: MCPNode[];
  edges: MCPEdge[];
  
  // Actions
  setNodes: (nodes: MCPNode[]) => void;
  setEdges: (edges: MCPEdge[]) => void;
  addNode: (node: MCPNode) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updates: Partial<MCPNode>) => void;
  
  // Tool palette
  availableTools: MCPTool[];
  setAvailableTools: (tools: MCPTool[]) => void;
  
  // Selected node for properties panel
  selectedNode: MCPNode | null;
  setSelectedNode: (node: MCPNode | null) => void;
  
  // Project info
  projectName: string;
  setProjectName: (name: string) => void;
}

export const useStore = create<BuilderStore>((set, get) => ({
  // Initial state
  nodes: [],
  edges: [],
  availableTools: [
    {
      name: 'search',
      description: 'Search for files or content',
      inputSchema: {
        type: 'object' as const,
        properties: {
          query: {
            type: 'string' as const,
            description: 'Search query'
          },
          path: {
            type: 'string' as const,
            description: 'Path to search in'
          }
        },
        required: ['query']
      }
    },
    {
      name: 'read_file',
      description: 'Read file contents',
      inputSchema: {
        type: 'object' as const,
        properties: {
          path: {
            type: 'string' as const,
            description: 'File path to read'
          }
        },
        required: ['path']
      }
    },
    {
      name: 'write_file',
      description: 'Write content to file',
      inputSchema: {
        type: 'object' as const,
        properties: {
          path: {
            type: 'string' as const,
            description: 'File path to write'
          },
          content: {
            type: 'string' as const,
            description: 'Content to write'
          }
        },
        required: ['path', 'content']
      }
    }
  ],
  selectedNode: null,
  projectName: 'Untitled MCP Server',
  
  // Actions
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(n => n.id !== nodeId),
    edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId)
  })),
  
  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(n => 
      n.id === nodeId ? { ...n, ...updates } : n
    )
  })),
  
  setAvailableTools: (tools) => set({ availableTools: tools }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setProjectName: (name) => set({ projectName: name })
}));
