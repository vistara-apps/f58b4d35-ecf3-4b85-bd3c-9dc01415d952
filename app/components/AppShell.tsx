'use client';

import { Home, BarChart3, User, Pause } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function AppShell({ children, activeTab = 'home' }: AppShellProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'meditation', icon: Pause, label: 'Meditate', href: '/' },
    { id: 'progress', icon: BarChart3, label: 'Progress', href: '/progress' },
    { id: 'profile', icon: User, label: 'Profile', href: '/' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-bg">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-surface/80 backdrop-blur-sm border-t border-primary/10">
        <div className="flex items-center justify-around py-2 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-base ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
