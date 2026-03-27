import React from 'react';
import { useStore } from '../../store/builderStore';
import { Settings } from 'lucide-react';

export default function PropertiesPanel() {
  const { selectedNode, updateNode } = useStore();

  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Settings className="w-4 h-4" />
          <h3 className="font-semibold">Properties</h3>
        </div>
        <p className="text-sm text-gray-500">Select a node to view properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
      <div className="flex items-center gap-2 text-white mb-4">
        <Settings className="w-4 h-4" />
        <h3 className="font-semibold">Properties</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Node Name
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => updateNode(selectedNode.id, {
              data: { ...selectedNode.data, label: e.target.value }
            })}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
        
        {selectedNode.data.tool && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Tool Details</h4>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-sm text-gray-400 mb-2">
                {selectedNode.data.tool.description}
              </p>
              <div className="text-xs text-gray-500">
                <strong>Parameters:</strong>
                <ul className="mt-1 space-y-1">
                  {Object.entries(selectedNode.data.tool.inputSchema.properties).map(([key, param]: [string, any]) => (
                    <li key={key} className="flex justify-between">
                      <span>{key}:</span>
                      <span className="text-blue-400">{param.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
