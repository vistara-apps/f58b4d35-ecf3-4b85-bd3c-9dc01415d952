'use client';

import { Home, BarChart3, User, Pause } from 'lucide-react';
import { useState } from 'react';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function AppShell({ children, activeTab = 'home' }: AppShellProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'meditation', icon: Pause, label: 'Meditate' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-bg">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-surface/90 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-accent bg-accent/10' 
                    : 'text-text-secondary hover:text-fg'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
