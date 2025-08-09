
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const AuthLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <circle cx="12" cy="4" r="2" />
    <path d="M12 7c-2.484 0-4.5 2.016-4.5 4.5V14h9v-2.5C16.5 9.016 14.484 7 12 7z" />
    <path d="M11 15h2v5h3v2H8v-2h3v-5z" />
  </svg>
);

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
        <path d="M12 5.16c1.54 0 2.92.52 3.99 1.58l3.15-3.15C17.45 1.8 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
        <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
);

function PreLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <Logo isSpinning={true} />
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (userType === 'tailor') {
        router.push('/tailor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      if (userType === 'tailor') {
        router.push('/tailor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Google login failed');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PreLoader />;
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 animate-fade-in-up">
      <div className="hidden lg:block relative">
        <Image 
          src="/loginpage.png"
          alt="Fashion model"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto bg-muted p-3 rounded-full w-fit">
              <AuthLogo className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <RadioGroup defaultValue="customer" onValueChange={(value) => setUserType(value as 'customer' | 'tailor')} className="grid grid-cols-2 gap-4">
              <Label htmlFor="customer-radio" className="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="customer" id="customer-radio" />
                <span>Customer</span>
              </Label>
              <Label htmlFor="tailor-radio" className="flex items-center justify-center gap-2 cursor-pointer p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="tailor" id="tailor-radio" />
                <span>Tailor</span>
              </Label>
          </RadioGroup>

          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {userType === 'tailor' && (
              <div className="space-y-2">
                <Input
                  id="tailor-code"
                  type="text"
                  placeholder="Enter Unique Tailor Code"
                  required
                />
              </div>
            )}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Continue as {userType === 'customer' ? 'Customer' : 'Tailor'}
            </Button>
          </form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing up, you agree to our{' '}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
