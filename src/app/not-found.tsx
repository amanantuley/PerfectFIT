
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg animate-fade-in-up">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <SearchX className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            404 - Page Not Found
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Oops! The page you're looking for seems to have gotten lost in the fabric.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Let's get you back on the right pattern. You can return to our homepage to continue your journey to the perfect fit.
          </p>
          <Button asChild size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
