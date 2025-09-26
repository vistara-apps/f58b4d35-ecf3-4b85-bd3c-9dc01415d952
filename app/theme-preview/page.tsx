'use client';

import { useTheme } from '../components/ThemeProvider';
import { Palette, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { 
      id: 'default', 
      name: 'CalmMind (Default)', 
      description: 'Calming meditation theme with purple gradients',
      preview: 'bg-gradient-to-br from-purple-900 to-blue-900'
    },
    { 
      id: 'celo', 
      name: 'Celo', 
      description: 'Black background with yellow accents',
      preview: 'bg-gradient-to-br from-black to-yellow-900'
    },
    { 
      id: 'solana', 
      name: 'Solana', 
      description: 'Dark purple with magenta accents',
      preview: 'bg-gradient-to-br from-purple-900 to-pink-900'
    },
    { 
      id: 'base', 
      name: 'Base', 
      description: 'Dark blue with Base blue accents',
      preview: 'bg-gradient-to-br from-blue-900 to-blue-700'
    },
    { 
      id: 'coinbase', 
      name: 'Coinbase', 
      description: 'Dark navy with Coinbase blue accents',
      preview: 'bg-gradient-to-br from-slate-900 to-blue-800'
    },
  ];

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="p-2 rounded-lg bg-surface/60 hover:bg-surface/80 transition-colors">
            <ArrowLeft size={20} className="text-text-primary" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Theme Preview</h1>
            <p className="text-text-secondary">Choose your preferred theme</p>
          </div>
        </div>

        {/* Current Theme Display */}
        <div className="glass-card p-6 text-center space-y-4">
          <Palette className="w-12 h-12 text-accent mx-auto" />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Current Theme</h2>
            <p className="text-text-secondary">
              {themes.find(t => t.id === theme)?.name || 'CalmMind (Default)'}
            </p>
          </div>
        </div>

        {/* Theme Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Available Themes</h3>
          
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id as any)}
              className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                theme === themeOption.id
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 bg-surface/40 hover:bg-surface/60'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${themeOption.preview}`}></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">{themeOption.name}</h4>
                  <p className="text-sm text-text-secondary">{themeOption.description}</p>
                </div>
                {theme === themeOption.id && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Preview Components */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Preview</h3>
          
          {/* Sample Card */}
          <div className="glass-card p-4 space-y-3">
            <h4 className="font-semibold text-text-primary">Sample Meditation</h4>
            <p className="text-text-secondary text-sm">This is how content will look in the selected theme</p>
            <div className="flex space-x-2">
              <button className="btn-primary px-4 py-2 text-sm">Primary Button</button>
              <button className="btn-secondary px-4 py-2 text-sm">Secondary Button</button>
            </div>
          </div>

          {/* Sample Progress */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-primary font-medium">Weekly Progress</span>
              <span className="text-accent">4/7</span>
            </div>
            <div className="w-full bg-surface/60 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '57%' }}></div>
            </div>
          </div>
        </div>

        {/* URL Parameter Info */}
        <div className="glass-card p-4 text-center space-y-2">
          <p className="text-sm text-text-secondary">
            You can also set themes via URL parameter:
          </p>
          <code className="text-xs bg-surface/60 px-2 py-1 rounded text-accent">
            ?theme={theme}
          </code>
        </div>
      </div>
    </div>
  );
}
