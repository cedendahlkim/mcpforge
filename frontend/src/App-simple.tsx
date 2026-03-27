import React from 'react';

function App() {
  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">🔥 MCPForge</h1>
        <p className="text-xl mb-8">Build MCP servers in minutes, not days</p>
        
        <div className="bg-gray-800 rounded-lg p-6 max-w-md">
          <h2 className="text-lg font-semibold mb-4">Status: MVP Ready</h2>
          
          <div className="text-left space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Backend API running on port 3001</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Frontend scaffold ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>TypeScript code generator working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Visual builder needs TypeScript fixes</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
              Test Backend API
            </button>
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
              Generate Example Code
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mt-8">
          Next: Fix TypeScript imports and enable drag-and-drop builder
        </p>
      </div>
    </div>
  );
}

export default App;
