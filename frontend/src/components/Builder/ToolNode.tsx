import React from 'react';
import { Handle, Position } from 'reactflow';
import { Search, FileText, Save } from 'lucide-react';
import type { MCPNode } from '../../../../shared/types/mcp';

interface ToolNodeProps {
  data: MCPNode['data'];
  selected?: boolean;
}

const toolIcons = {
  search: Search,
  read_file: FileText,
  write_file: Save,
};

export default function ToolNode({ data, selected }: ToolNodeProps) {
  const Icon = toolIcons[data.tool?.name as keyof typeof toolIcons] || FileText;
  
  return (
    <div 
      className={`px-4 py-3 bg-gray-800 border-2 rounded-lg min-w-[200px] ${
        selected ? 'border-blue-500' : 'border-gray-600'
      }`}
    >
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-white">
          {data.label}
        </span>
      </div>
      
      {data.tool?.description && (
        <p className="text-xs text-gray-400 mb-2">
          {data.tool.description}
        </p>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
