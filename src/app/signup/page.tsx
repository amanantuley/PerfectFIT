'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, Facebook, Github } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-4 w-4">
        <path d="M19.39,14.73a5.3,5.3,0,0,1-2.2-1.37,5.56,5.56,0,0,1-1.3-2.12,4.06,4.06,0,0,1,1-2.87,4.32,4.32,0,0,1,2.83-1.39,1,1,0,0,1,.84.18,1,1,0,0,1,.35.78,4.5,4.5,0,0,1-.58,2.51,5,5,0,0,1-1.78,2.15C18,13.68,17.41,14.8,19.39,14.73Zm-6.52,2.05a4.87,4.87,0,0,1-2.31,1.38,4.42,4.42,0,0,1-2.73-.2,4.71,4.71,0,0,1-1.89-1.5,10.15,10.15,0,0,1-1.88-3.4,6.29,6.29,0,0,1,.83-4.11,5.2,5.2,0,0,1,2-2,4.48,4.48,0,0,1,2.91-.7,4.28,4.28,0,0,1,2.39.73,1.13,1.13,0,0,1,.51.81,1,1,0,0,1-.6.94,3,3,0,0,0-1.72-.48,3.22,3.22,0,0,0-2.22.7,4,4,0,0,0-1.4,2,6.48,6.48,0,0,0-.24,2.9,4.45,4.45,0,0,0,1.44,3.06,3.62,3.62,0,0,0,2.4.92,4.36,4.36,0,0,0,2.1-.53,1,1,0,0,1,1.17.84A.94.94,0,0,1,12.87,16.78Z" />
    </svg>
);

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mx-auto mb-4">
                <Logo />
            </div>
            <h1 className="text-3xl font-bold font-headline">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Join PerfectFit to get your perfect fit.
            </p>
          </div>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background/80 px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
                    <AppleIcon />
                    Apple
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
       <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://placehold.co/1080x1920.png"
          alt="A variety of colorful fabrics and tailoring tools"
          fill
          className="object-cover"
          data-ai-hint="tailor fabric"
        />
      </div>
    </div>
  );
}
