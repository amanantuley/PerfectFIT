
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Check, LogIn, Download } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const appFeatures = [
    "AI-Powered Measurements",
    "Personalized Recommendations",
    "Buy or Rent Garments",
    "Subscription Perks & Discounts",
    "AI Fitness & Diet Plans",
    "PerfectPay Wallet with Cashback"
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
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
          <span className="sr-only">PerfectFit</span>
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
       <main className="flex-1 p-4 sm:p-6 flex items-center justify-center">
        <Card className="w-full max-w-5xl shadow-lg animate-fade-in-up">
            <CardHeader className="text-center">
            <CardTitle className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Get the PerfectFit App</CardTitle>
            <CardDescription className="text-lg">
                Experience seamless tailoring and style, right at your fingertips.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                    <Image 
                        src="/app.png"
                        alt="App Screenshot 1"
                        width={250}
                        height={500}
                        className="rounded-xl shadow-2xl md:transform md:-rotate-6"
                    />
                    <Image 
                        src="/app.png"
                        alt="App Screenshot 2"
                        width={250}
                        height={500}
                        className="rounded-xl shadow-2xl transform rotate-6 hidden md:block"
                    />
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Your Ultimate Style Companion</h3>
                        <ul className="space-y-3">
                            {appFeatures.map(feature => (
                            <li key={feature} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-primary"/>
                                    <span>{feature}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4 p-4 rounded-lg bg-muted/30 border">
                        <p className="text-center text-muted-foreground">Ready to get started?</p>
                        <Button size="lg" className="w-full" onClick={handleDownloadClick}>
                            <Download className="mr-2 h-5 w-5" />
                            Download App .apk
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
       </main>
    </div>
  );
}
