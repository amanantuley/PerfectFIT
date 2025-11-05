'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Check, LogIn, Download, Apple, Play } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const appFeatures = [
  "AI-Powered Measurements",
  "Personalized Recommendations",
  "Buy or Rent Garments",
  "Subscription Perks & Discounts",
  "AI Fitness & Diet Plans",
  "PerfectPay Wallet with Cashback",
];

export default function DownloadAppPage() {
  const { toast } = useToast();

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = '/app-debug.apk';
    link.setAttribute('download', 'app-debug.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Download Started!',
      description: 'Your download for app-debug.apk has begun.',
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-teal-100/40 via-purple-100/30 to-orange-100/40 dark:from-teal-900/30 dark:via-purple-900/20 dark:to-orange-900/30">
      {/* Floating gradient blur */}
      <div className="absolute -top-20 -right-40 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/30 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/70 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo />
          <span className="font-semibold text-lg hidden sm:inline">PerfectFit</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link href="/signup">
            <Button>
              <LogIn className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <Card className="shadow-2xl border-none bg-background/80 backdrop-blur-md">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                Get the PerfectFit App
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Experience seamless tailoring and personal style, right at your fingertips.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-12 items-center">
              {/* App Mockups */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center gap-4"
              >
                <Image
                  src="/app.png"
                  alt="App Screenshot 1"
                  width={250}
                  height={500}
                  className="rounded-2xl shadow-2xl transform md:-rotate-6"
                />
                <Image
                  src="/app.png"
                  alt="App Screenshot 2"
                  width={250}
                  height={500}
                  className="rounded-2xl shadow-2xl hidden md:block rotate-6"
                />
              </motion.div>

              {/* Features & Download Section */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                    Your Ultimate Style Companion
                  </h3>
                  <ul className="space-y-3">
                    {appFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4 p-5 rounded-xl bg-muted/40 border border-muted-foreground/10 shadow-inner">
                  <p className="text-center text-muted-foreground">Ready to get started?</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleDownloadClick}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download .apk
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <Play className="mr-2 h-5 w-5 text-green-500" />
                      Google Play (Coming Soon)
                    </Button>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-6 border-t border-muted/30">
        © {new Date().getFullYear()} PerfectFit. All rights reserved.
      </footer>
    </div>
  );
}
