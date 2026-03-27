import { useState } from 'react';
import { Zap, Code, Rocket, Play, Download, ExternalLink } from 'lucide-react';

export default function HeroBeautiful() {
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #1e3a8a 50%, #581c87 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '16px 24px'
    },
    heroSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '80px 24px'
    },
    title: {
      fontSize: '64px',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center' as const,
      marginBottom: '24px',
      background: 'linear-gradient(90deg, #fff, #fb923c)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '20px',
      color: '#d1d5db',
      textAlign: 'center' as const,
      marginBottom: '48px',
      maxWidth: '672px',
      margin: '0 auto 48px'
    },
    button: {
      background: 'linear-gradient(90deg, #f97316, #ea580c)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '24px'
    },
    codeBlock: {
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(90deg, #f97316, #ea580c)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              MCPForge
            </h1>
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>
              Build MCP servers in minutes
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a 
              href="https://github.com/gracestack/mcpforge" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#d1d5db', textDecoration: 'none' }}
            >
              <ExternalLink style={{ width: '20px', height: '20px' }} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(251, 146, 60, 0.1)',
            border: '1px solid rgba(251, 146, 60, 0.2)',
            borderRadius: '9999px',
            padding: '8px 16px',
            marginBottom: '24px'
          }}>
            <Zap style={{ width: '16px', height: '16px', color: '#fb923c' }} />
            <span style={{ fontSize: '14px', color: '#fb923c' }}>
              Visual MCP Server Builder
            </span>
          </div>
          
          <h2 style={styles.title}>
            Build MCP Servers in Minutes
          </h2>
          
          <p style={styles.subtitle}>
            Drag-and-drop interface to create Model Context Protocol servers. 
            Generate production-ready TypeScript code instantly.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
            <button 
              onClick={generateExample}
              disabled={isGenerating}
              style={{
                ...styles.button,
                opacity: isGenerating ? 0.5 : 1,
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}
            >
              <Play style={{ width: '16px', height: '16px' }} />
              {isGenerating ? 'Generating...' : 'Generate Example'}
            </button>
            
            {generatedCode && (
              <button 
                onClick={downloadCode}
                style={{
                  ...styles.button,
                  background: '#374151'
                }}
              >
                <Download style={{ width: '16px', height: '16px' }} />
                Download Code
              </button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          <div style={styles.card}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Code style={{ width: '24px', height: '24px', color: '#60a5fa' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
              No-Code to Code
            </h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Visual drag-and-drop builder that generates production-ready TypeScript MCP servers
            </p>
          </div>

          <div style={styles.card}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(34, 197, 94, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Rocket style={{ width: '24px', height: '24px', color: '#4ade80' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
              One-Click Deploy
            </h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Export to GitHub, deploy to Vercel, or run locally with automatic dependency management
            </p>
          </div>

          <div style={styles.card}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Zap style={{ width: '24px', height: '24px', color: '#a855f7' }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
              Lightning Fast
            </h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Build complex MCP servers in under 30 seconds with real-time validation and testing
            </p>
          </div>
        </div>

        {/* Code Preview */}
        {generatedCode && (
          <div style={styles.codeBlock}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#d1d5db', margin: 0 }}>
                Generated MCP Server
              </h3>
              <button 
                onClick={downloadCode}
                style={{
                  background: '#374151',
                  color: '#d1d5db',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Copy
              </button>
            </div>
            <pre style={{
              padding: '24px',
              fontSize: '14px',
              color: '#4ade80',
              overflow: 'auto',
              maxHeight: '384px',
              margin: 0,
              fontFamily: 'ui-monospace, Consolas, monospace',
              whiteSpace: 'pre-wrap'
            }}>
              {generatedCode}
            </pre>
          </div>
        )}

        {/* Status */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '14px',
            color: '#d1d5db'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#4ade80',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span>Backend API Online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#4ade80',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span>Code Generator Ready</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#facc15',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span>Visual Builder Beta</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
