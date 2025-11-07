import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4 animate-fade-in-up">
      <Card className="w-full max-w-md text-center shadow-xl border border-border/50">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <SearchX className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            404 - Page Not Found
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2">
            Oops! The page you’re looking for seems to have been stitched out of existence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Let’s get you back on track. You can return to the homepage or explore your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="sm:w-auto w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="sm:w-auto w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
