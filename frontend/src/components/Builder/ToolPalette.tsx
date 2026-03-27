import React from 'react';
import { useStore } from '../../store/builderStore';
import { Search, FileText, Save, Plus } from 'lucide-react';

const toolIcons = {
  search: Search,
  read_file: FileText,
  write_file: Save,
};

export default function ToolPalette() {
  const { availableTools, addNode } = useStore();

  const handleDragStart = (event: React.DragEvent, tool: any) => {
    event.dataTransfer.setData('application/reactflow', 'tool');
    event.dataTransfer.setData('tool-data', JSON.stringify(tool));
    event.dataTransfer.effectAllowed = 'move';
  };

  const createToolNode = (tool: any) => {
    const newNode = {
      id: `tool-${Date.now()}`,
      type: 'tool',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: tool.name,
        tool: tool,
      },
    };
    addNode(newNode);
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Tool Palette
      </h3>
      
      <div className="space-y-2">
        {availableTools.map((tool) => {
          const Icon = toolIcons[tool.name as keyof typeof toolIcons] || FileText;
          
          return (
            <div
              key={tool.name}
              draggable
              onDragStart={(e) => handleDragStart(e, tool)}
              onClick={() => createToolNode(tool)}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-move hover:bg-gray-700 transition-colors"
            >
              <Icon className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-400">
                  {tool.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
