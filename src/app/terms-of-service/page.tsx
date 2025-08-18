
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                Terms of Service
              </CardTitle>
              <CardDescription>Last updated: July 29, 2024</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Welcome to PerfectFit! These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">1. Account Registration</h3>
            <p>
              To use certain features of our Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">2. AI Measurement Service</h3>
            <p>
              Our AI Measurement Service uses images you provide to estimate your body measurements. You grant PerfectFit a non-exclusive, worldwide, royalty-free license to use, process, and analyze the images solely for the purpose of providing you with measurement data and personalized recommendations. We are not liable for inaccuracies resulting from poor quality images or user error.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">3. User Conduct</h3>
            <p>
              You agree not to use the Services for any unlawful purpose or in any way that could harm, disable, overburden, or impair the Service. You are responsible for all content you upload and for your interactions with other users.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">4. Purchases and Rentals</h3>
            <p>
              All purchases and rentals made through the Services are subject to our Return and Refund Policy, which is incorporated into these Terms. We reserve the right to refuse or cancel any order for any reason.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">5. Termination</h3>
            <p>
              We may terminate or suspend your account and access to the Services at our sole discretion, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground">6. Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
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
