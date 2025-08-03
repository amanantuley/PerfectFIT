
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chrome } from 'lucide-react';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (userType === 'tailor') {
        router.push('/tailor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      if (userType === 'tailor') {
        router.push('/tailor/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
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
            <h1 className="text-3xl font-bold animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <RadioGroup defaultValue="customer" onValueChange={(value) => setUserType(value as 'customer' | 'tailor')} className="flex justify-center gap-4">
              <Label htmlFor="customer-radio" className="flex flex-col items-center gap-2 cursor-pointer p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="customer" id="customer-radio" />
                <span>Customer</span>
              </Label>
              <Label htmlFor="tailor-radio" className="flex flex-col items-center gap-2 cursor-pointer p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                <RadioGroupItem value="tailor" id="tailor-radio" />
                <span>Tailor</span>
              </Label>
          </RadioGroup>

          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <Chrome className="mr-2 h-4 w-4" />
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
