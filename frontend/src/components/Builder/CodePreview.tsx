import React, { useState } from 'react';
import { useStore } from '../../store/builderStore';
import { Code, Play, Download } from 'lucide-react';

export default function CodePreview() {
  const { nodes, edges, projectName } = useStore();
  const [activeTab, setActiveTab] = useState<'preview' | 'test' | 'console'>('preview');
  const [generatedCode, setGeneratedCode] = useState<string>('// Click "Generate" to create MCP server code');

  const generateCode = async () => {
    try {
      const flow = { nodes, edges };
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flow, language: 'typescript' })
      });
      
      const result = await response.json();
      setGeneratedCode(result.code || 'Failed to generate code');
    } catch (error) {
      setGeneratedCode('// Error: Could not connect to backend server');
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-sm flex items-center gap-2 ${
            activeTab === 'preview' 
              ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Code className="w-3 h-3" />
          Code Preview
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`px-4 py-2 text-sm flex items-center gap-2 ${
            activeTab === 'test' 
              ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Play className="w-3 h-3" />
          Live Test
        </button>
        <button
          onClick={() => setActiveTab('console')}
          className={`px-4 py-2 text-sm flex items-center gap-2 ${
            activeTab === 'console' 
              ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Console
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={generateCode}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center gap-1"
          >
            <Code className="w-3 h-3" />
            Generate
          </button>
          <button
            onClick={downloadCode}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
        <span className="text-xs text-gray-400">TypeScript</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'preview' && (
          <pre className="h-full bg-gray-950 text-green-400 p-4 overflow-auto text-xs font-mono">
            {generatedCode}
          </pre>
        )}
        {activeTab === 'test' && (
          <div className="h-full p-4 text-gray-400">
            <p>Live testing coming soon...</p>
          </div>
        )}
        {activeTab === 'console' && (
          <div className="h-full bg-gray-950 p-4 overflow-auto">
            <div className="text-green-400 text-xs font-mono">
              $ MCPForge Console Ready<br/>
              $ Waiting for code generation...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
