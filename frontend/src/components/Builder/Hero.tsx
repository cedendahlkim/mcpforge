import React, { useState } from 'react';
import { Zap, Code, Rocket, Play, Download, ExternalLink } from 'lucide-react';

export default function Hero() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const generateExample = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flow: {
            nodes: [
              {
                id: 'tool-1',
                type: 'tool',
                position: { x: 100, y: 100 },
                data: {
                  label: 'search_files',
                  tool: {
                    name: 'search_files',
                    description: 'Search for files in directory',
                    inputSchema: {
                      type: 'object',
                      properties: {
                        query: { type: 'string', description: 'Search query' },
                        path: { type: 'string', description: 'Directory path' }
                      },
                      required: ['query']
                    }
                  }
                }
              }
            ],
            edges: []
          },
          language: 'typescript'
        })
      });
      
      const result = await response.json();
      setGeneratedCode(result.code || 'Failed to generate code');
    } catch (error) {
      setGeneratedCode('// Error: Could not connect to backend');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcp-server.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MCPForge</h1>
              <span className="text-sm text-gray-300">Build MCP servers in minutes</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/gracestack/mcpforge" 
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300">Visual MCP Server Builder</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6">
            Build MCP Servers
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              {' '}in Minutes
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Drag-and-drop interface to create Model Context Protocol servers. 
            Generate production-ready TypeScript code instantly.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <button 
              onClick={generateExample}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <Play className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate Example'}
            </button>
            
            {generatedCode && (
              <button 
                onClick={downloadCode}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Download Code
              </button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">No-Code to Code</h3>
            <p className="text-gray-300">
              Visual drag-and-drop builder that generates production-ready TypeScript MCP servers
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">One-Click Deploy</h3>
            <p className="text-gray-300">
              Export to GitHub, deploy to Vercel, or run locally with automatic dependency management
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-300">
              Build complex MCP servers in under 30 seconds with real-time validation and testing
            </p>
          </div>
        </div>

        {/* Code Preview */}
        {generatedCode && (
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
              <h3 className="text-sm font-semibold text-gray-300">Generated MCP Server</h3>
              <button 
                onClick={downloadCode}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <pre className="p-6 text-sm text-green-400 overflow-auto max-h-96 font-mono">
              {generatedCode}
            </pre>
          </div>
        )}

        {/* Status */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Backend API Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Code Generator Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Visual Builder Beta</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
