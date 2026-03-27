import { Request, Response } from 'express';
import { MCPFlow, GeneratedCode } from '../types/mcp';
import { generateTypeScriptCode } from '../generators/typescript';

export async function generateCode(req: Request, res: Response) {
  try {
    const { flow, language = 'typescript' }: { flow: MCPFlow; language?: string } = req.body;

    if (!flow || !flow.nodes || !flow.edges) {
      return res.status(400).json({ error: 'Invalid flow data' });
    }

    let generated: GeneratedCode;

    switch (language) {
      case 'typescript':
        generated = await generateTypeScriptCode(flow);
        break;
      default:
        return res.status(400).json({ error: `Unsupported language: ${language}` });
    }

    res.json(generated);
  } catch (error) {
    console.error('Code generation error:', error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
}
