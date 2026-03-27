import { MCPFlow, GeneratedCode } from '../types/mcp';

export async function generateTypeScriptCode(flow: MCPFlow): Promise<GeneratedCode> {
  const tools = flow.nodes
    .filter(node => node.type === 'tool' && node.data.tool)
    .map(node => node.data.tool!);

  const code = `
// Auto-generated MCP Server by MCPForge
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: '${flow.nodes[0]?.data.label || 'MCPForge Server'}',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool implementations
${tools.map(tool => generateToolImplementation(tool)).join('\n\n')}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
${tools.map(tool => generateToolDefinition(tool)).join(',\n')}
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
${tools.map(tool => generateToolCase(tool)).join('\n')}
      default:
        throw new Error(\`Unknown tool: \${name}\`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: \`Error: \${error instanceof Error ? error.message : String(error)}\`,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
`;

  return {
    language: 'typescript',
    code: code.trim(),
    dependencies: [
      '@modelcontextprotocol/sdk',
      'typescript',
      '@types/node'
    ],
    instructions: `
# Installation & Usage

1. Install dependencies:
   npm install @modelcontextprotocol/sdk typescript @types/node

2. Compile TypeScript:
   npx tsc

3. Run the server:
   node dist/index.js

4. Test with Claude Desktop:
   Add to claude_desktop_config.json:
   {
     "mcpServers": {
       "your-server": {
         "command": "node",
         "args": ["path/to/dist/index.js"]
       }
     }
   }
`
  };
}

function generateToolImplementation(tool: any): string {
  return `async function handle${tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}(args: any) {
  // TODO: Implement ${tool.name} functionality
  console.log('${tool.name} called with:', args);
  
  return {
    content: [
      {
        type: 'text',
        text: '${tool.name} executed successfully',
      },
    ],
  };
}`;
}

function generateToolDefinition(tool: any): string {
  return `      {
        name: '${tool.name}',
        description: '${tool.description}',
        inputSchema: ${JSON.stringify(tool.inputSchema, null, 8)}
      }`;
}

function generateToolCase(tool: any): string {
  return `      case '${tool.name}':
        return await handle${tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}(args);`;
}
