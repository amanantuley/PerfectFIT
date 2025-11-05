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
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const AuthLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
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
  </svg>
);

function PreLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <Logo isSpinning={true} />
    </div>
  );
}

const subscribeToNotifications = (email: string) => {
  console.log(`Subscribed ${email} to notifications`);
};

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Email Auth — fixed
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes('password')) {
        // ✅ User already exists → login
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Login successful!');
      } else if (methods.length === 0) {
        // 🆕 New email → register
        await createUserWithEmailAndPassword(auth, email, password);
        subscribeToNotifications(email);
        setSuccess('Account created successfully!');
      } else {
        setError('This email is already linked with another provider (e.g. Google).');
        return;
      }

      // Redirect
      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');

    } catch (err: any) {
      console.error(err);
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in instead.');
          break;
        case 'auth/user-not-found':
          setError('No user found. Please sign up first.');
          break;
        default:
          setError(err.message || 'Authentication failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      if (isNewUser && result.user.email) subscribeToNotifications(result.user.email);
      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Forgot Password
  const handleForgotPassword = async () => {
    if (!email) return setError('Enter your email to reset password.');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    }
  };

  if (isLoading) return <PreLoader />;

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 animate-fade-in-up">
      <div className="hidden lg:block relative">
        <Image src="/loginpage.png" alt="Fashion model" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto bg-muted p-3 rounded-full w-fit">
              <AuthLogo className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
              Welcome to PerfectFit
            </h1>
            <p className="text-muted-foreground">Sign in or create an account to continue.</p>
          </div>

          {/* User type */}
          <RadioGroup
            defaultValue="customer"
            onValueChange={(value) => setUserType(value as 'customer' | 'tailor')}
            className="grid grid-cols-2 gap-4"
          >
            <Label htmlFor="customer-radio" className="flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer">
              <RadioGroupItem value="customer" id="customer-radio" />
              <span>Customer</span>
            </Label>
            <Label htmlFor="tailor-radio" className="flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer">
              <RadioGroupItem value="tailor" id="tailor-radio" />
              <span>Tailor</span>
            </Label>
          </RadioGroup>

          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {userType === 'tailor' && <Input id="tailor-code" type="text" placeholder="Enter Unique Tailor Code" required />}
            <Button type="submit" className="w-full">Continue with Email</Button>
          </form>

          <div className="text-right text-sm">
            <button type="button" onClick={handleForgotPassword} className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-green-500 text-center">{success}</p>}
        </div>
      </div>
    </div>
  );
}
