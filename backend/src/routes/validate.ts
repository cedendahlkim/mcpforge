import { Request, Response } from 'express';
import { MCPFlow } from '../types/mcp';

export async function validateFlow(req: Request, res: Response) {
  try {
    const { flow }: { flow: MCPFlow } = req.body;

    if (!flow || !flow.nodes || !flow.edges) {
      return res.status(400).json({ error: 'Invalid flow data' });
    }

    const errors: string[] = [];

    // Validate nodes
    for (const node of flow.nodes) {
      if (!node.id) {
        errors.push('Node missing ID');
      }
      if (!node.type) {
        errors.push(`Node ${node.id} missing type`);
      }
      if (!node.position) {
        errors.push(`Node ${node.id} missing position`);
      }
    }

    // Validate edges
    for (const edge of flow.edges) {
      if (!edge.id) {
        errors.push('Edge missing ID');
      }
      if (!edge.source || !edge.target) {
        errors.push(`Edge ${edge.id} missing source or target`);
      }
    }

    // Check for orphaned nodes
    const connectedNodes = new Set();
    flow.edges.forEach(edge => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    const orphanedNodes = flow.nodes.filter(node => !connectedNodes.has(node.id));
    if (orphanedNodes.length > 0) {
      errors.push(`Orphaned nodes: ${orphanedNodes.map(n => n.id).join(', ')}`);
    }

    res.json({
      valid: errors.length === 0,
      errors,
      warnings: []
    });
  } catch (error) {
    console.error('Flow validation error:', error);
    res.status(500).json({ error: 'Failed to validate flow' });
  }
}
