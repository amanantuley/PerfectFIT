
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                Privacy Policy
              </CardTitle>
              <CardDescription>Last updated: July 29, 2024</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          <p>
            PerfectFit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
          </p>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">1. Information We Collect</h3>
            <p>
              We may collect personal information from you such as your name, email address, shipping address, and payment information. We also collect the images you upload for our AI Measurement Service. We may also collect non-personal information, such as browser type and operating system.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>To provide, operate, and maintain our Services.</li>
                <li>To process your transactions and manage your orders.</li>
                <li>To improve, personalize, and expand our Services.</li>
                <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>To analyze the images you provide to generate your body measurements.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">3. Data Security</h3>
            <p>
             We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">4. Data Retention</h3>
            <p>
             We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. Images uploaded for measurement are processed and then deleted from our active servers within a reasonable timeframe, unless you explicitly save them to your profile.
            </p>
          </div>
          
           <div className="space-y-4">
            <h3 className="font-bold text-foreground">5. Your Privacy Rights</h3>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal information. You can usually manage your account information yourself or by contacting us directly.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
                <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
