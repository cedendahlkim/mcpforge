import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { MCPNode, MCPEdge } from '../../../../shared/types/mcp';
import ToolNode from './ToolNode';
import { useStore } from '../../store/builderStore';

const nodeTypes = {
  tool: ToolNode,
};

export default function MCPBuilder() {
  const { nodes, edges, setNodes, setEdges } = useStore();
  const [internalNodes, setInternalNodes, onNodesChange] = useNodesState(nodes);
  const [internalEdges, setInternalEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `edge-${Date.now()}` } as Edge;
      setInternalEdges((eds) => addEdge(newEdge, eds));
      setEdges(internalEdges.concat(newEdge));
    },
    [setInternalEdges, internalEdges, setEdges]
  );

  const onNodesChangeInternal = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      setNodes(internalNodes);
    },
    [onNodesChange, internalNodes, setNodes]
  );

  const onEdgesChangeInternal = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      setEdges(internalEdges);
    },
    [onEdgesChange, internalEdges, setEdges]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={internalNodes}
        edges={internalEdges}
        onNodesChange={onNodesChangeInternal}
        onEdgesChange={onEdgesChangeInternal}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
