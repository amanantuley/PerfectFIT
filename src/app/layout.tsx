import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ChatWidget from '@/components/chat-widget';
import { cn } from '@/lib/utils';

// ✅ SEO & Meta
export const metadata: Metadata = {
  title: {
    default: 'PerfectFit',
    template: '%s | PerfectFit',
  },
  description: 'Redefining Tailoring with Artificial Intelligence — Precision. Style. Confidence.',
  keywords: [
    'AI tailoring',
    'virtual fitting',
    'PerfectFit',
    'custom clothing',
    'smart fashion technology',
    'measurements AI',
  ],
  authors: [{ name: 'PerfectFit Team' }],
  creator: 'PerfectFit Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://perfectfit.ai',
    siteName: 'PerfectFit',
    title: 'PerfectFit — Redefining Tailoring with AI',
    description: 'Experience perfect sizing and premium tailoring powered by AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PerfectFit AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerfectFit — Smart Tailoring Powered by AI',
    description: 'Get your perfect fit with AI-driven body measurements and smart styling.',
    images: ['/og-image.png'],
    creator: '@perfectfit_ai',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// ✅ Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={cn(
          'font-body antialiased bg-background text-foreground',
          'scroll-smooth transition-colors duration-300'
        )}
      >
        {/* ✅ Theme Provider for light/dark mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="perfectfit-theme"
        >
          {/* ✅ Main App Wrapper */}
          <main className="relative min-h-screen overflow-x-hidden">
            {/* Smooth fade animation between routes */}
            <div className="animate-fade-in-up">{children}</div>

            {/* Global UI Components */}
            <Toaster />
            <ChatWidget />
          </main>
        </ThemeProvider>

        {/* ✅ Global Decorative Gradient */}
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      </body>
    </html>
  );
}
