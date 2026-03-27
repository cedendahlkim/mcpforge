import React from 'react';
import MCPBuilder from './components/Builder/MCPBuilder';
import ToolPalette from './components/Builder/ToolPalette';
import PropertiesPanel from './components/Builder/PropertiesPanel';
import CodePreview from './components/Builder/CodePreview';
import { useStore } from './store/builderStore';
import './App.css';

function App() {
  const { projectName, setProjectName } = useStore();

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-blue-400">🔥 MCPForge</h1>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
              placeholder="Project name"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
              Save
            </button>
            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
              Export
            </button>
            <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm">
              Deploy
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tool Palette */}
        <ToolPalette />
        
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <MCPBuilder />
          </div>
          
          {/* Bottom Panel */}
          <div className="h-64 bg-gray-800 border-t border-gray-700">
            <CodePreview />
          </div>
        </div>
        
        {/* Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
