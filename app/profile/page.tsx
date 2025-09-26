'use client';

import { AppShell } from '../components/AppShell';
import { WalletConnect } from '../components/WalletConnect';
import { Settings2, Crown, Bell, Moon, Volume2, Palette } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'CalmMind', color: 'bg-purple-500' },
    { id: 'celo', name: 'Celo', color: 'bg-yellow-500' },
    { id: 'solana', name: 'Solana', color: 'bg-purple-600' },
    { id: 'base', name: 'Base', color: 'bg-blue-500' },
    { id: 'coinbase', name: 'Coinbase', color: 'bg-blue-600' },
  ];

  return (
    <AppShell activeTab="profile">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto flex items-center justify-center">
            <span className="text-2xl font-bold text-white">CM</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Welcome Back</h1>
            <p className="text-text-secondary">Manage your meditation journey</p>
          </div>
          <WalletConnect />
        </div>

        {/* Subscription Status */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-accent" />
              <div>
                <h3 className="font-semibold text-text-primary">Free Plan</h3>
                <p className="text-sm text-text-secondary">Limited AI generations</p>
              </div>
            </div>
            <button className="btn-primary px-4 py-2 text-sm">
              Upgrade
            </button>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <div className="text-sm text-text-secondary mb-2">This month's usage:</div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">AI Meditations</span>
              <span className="text-text-primary">3 / 5</span>
            </div>
            <div className="w-full bg-surface/60 rounded-full h-2 mt-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Palette size={20} />
            <span>Theme</span>
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 bg-surface/40 hover:bg-surface/60'
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${themeOption.color} mx-auto mb-2`}></div>
                <div className="text-xs text-text-primary">{themeOption.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Settings2 size={20} />
            <span>Settings</span>
          </h2>
          
          <div className="space-y-3">
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">Sleep Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-surface/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="glass-card p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Volume2 className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">Default Volume</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-full h-2 bg-surface/60 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Your Journey</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">42</div>
              <div className="text-sm text-text-secondary">Total Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">630</div>
              <div className="text-sm text-text-secondary">Minutes Meditated</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
