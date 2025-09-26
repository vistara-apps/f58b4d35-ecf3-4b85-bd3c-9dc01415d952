import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CalmMind AI - Your Personal Guide to Tranquility',
  description: 'AI-powered meditation and relaxation app for better sleep and mental wellness.',
  keywords: 'meditation, AI, sleep, relaxation, mindfulness, wellness',
  authors: [{ name: 'CalmMind AI Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
              <div className="floating-particles">
                <div className="particle" style={{ left: '10%', animationDuration: '6s' }}></div>
                <div className="particle" style={{ left: '20%', animationDuration: '8s' }}></div>
                <div className="particle" style={{ left: '80%', animationDuration: '7s' }}></div>
                <div className="particle" style={{ left: '90%', animationDuration: '9s' }}></div>
              </div>
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
