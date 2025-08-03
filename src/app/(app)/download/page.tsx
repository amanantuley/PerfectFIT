
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

const AppleLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-6 w-6">
        <path d="M19.39,14.73a5.3,5.3,0,0,1-2.2-1.37,5.56,5.56,0,0,1-1.3-2.12,4.06,4.06,0,0,1,1-2.87,4.32,4.32,0,0,1,2.83-1.39,1,1,0,0,1,.84.18,1,1,0,0,1,.35.78,4.5,4.5,0,0,1-.58,2.51,5,5,0,0,1-1.78,2.15C18,13.68,17.41,14.8,19.39,14.73Zm-6.52,2.05a4.87,4.87,0,0,1-2.31,1.38,4.42,4.42,0,0,1-2.73-.2,4.71,4.71,0,0,1-1.89-1.5,10.15,10.15,0,0,1-1.88-3.4,6.29,6.29,0,0,1,.83-4.11,5.2,5.2,0,0,1,2-2,4.48,4.48,0,0,1,2.91-.7,4.28,4.28,0,0,1,2.39.73,1.13,1.13,0,0,1,.51.81,1,1,0,0,1-.6.94,3,3,0,0,0-1.72-.48,3.22,3.22,0,0,0-2.22.7,4,4,0,0,0-1.4,2,6.48,6.48,0,0,0-.24,2.9,4.45,4.45,0,0,0,1.44,3.06,3.62,3.62,0,0,0,2.4.92,4.36,4.36,0,0,0,2.1-.53,1,1,0,0,1,1.17.84A.94.94,0,0,1,12.87,16.78Z" />
    </svg>
);

const GooglePlayLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor" className="mr-2 h-6 w-6">
        <path d="M325.1,256.2l-67.4-67.2,120.3-69.6,35.9,35.9Z"/>
        <path d="M480.8,234.4l-84.3-48.7-120.3,69.6,67.4,67.2,137.2-78.1A31.9,31.9,0,0,0,480.8,234.4Z"/>
        <path d="M16.1,480.8A31.9,31.9,0,0,0,57.5,496l226.7-130.8-120.3-69.8Z"/>
        <path d="M31.2,31.2,257.8,162,137.5,231.8,31.2,31.2Z"/>
    </svg>
);

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

  const handleDownloadClick = (store: 'App Store' | 'Google Play') => {
    toast({
        title: `Redirecting to ${store}...`,
        description: 'Our app is not yet available. Please check back later!',
    });
  };

  return (
    <Card className="w-full shadow-lg animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline text-rainbow bg-size-200 animate-text-rainbow">Get the PerfectFit App</CardTitle>
          <CardDescription className="text-lg">
            Experience seamless tailoring and style, right at your fingertips.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
                <Image 
                    src="https://placehold.co/250x500.png"
                    alt="App Screenshot 1"
                    width={250}
                    height={500}
                    className="rounded-xl shadow-2xl md:transform md:-rotate-6"
                    data-ai-hint="app screenshot"
                />
                 <Image 
                    src="https://placehold.co/250x500.png"
                    alt="App Screenshot 2"
                    width={250}
                    height={500}
                    className="rounded-xl shadow-2xl transform rotate-6 hidden md:block"
                    data-ai-hint="app interface"
                />
            </div>
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-rainbow bg-size-200 animate-text-rainbow">Your Ultimate Style Companion</h3>
                    <ul className="space-y-3">
                        {appFeatures.map(feature => (
                           <li key={feature} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary"/>
                                <span>{feature}</span>
                           </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex flex-col items-center gap-4 p-4 rounded-lg bg-muted/30 border">
                        <Image
                        src="https://placehold.co/150x150.png"
                        alt="QR Code for iOS App"
                        width={150}
                        height={150}
                        className="rounded-lg"
                        data-ai-hint="qr code"
                        />
                         <Button className="w-full" onClick={() => handleDownloadClick('App Store')}>
                            <AppleLogo />
                            App Store
                        </Button>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-4 p-4 rounded-lg bg-muted/30 border">
                        <Image
                        src="https://placehold.co/150x150.png"
                        alt="QR Code for Android App"
                        width={150}
                        height={150}
                        className="rounded-lg"
                        data-ai-hint="qr code"
                        />
                        <Button className="w-full" onClick={() => handleDownloadClick('Google Play')}>
                            <GooglePlayLogo />
                            Google Play
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
