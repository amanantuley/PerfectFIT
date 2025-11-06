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
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
    <path d="M12 5.16c1.54 0 2.92.52 3.99 1.58l3.15-3.15C17.45 1.8 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
  </svg>
);

const subscribeToNotifications = (email: string) => {
  console.log(`Subscribed ${email} to PerfectFit updates.`);
};

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes('password')) {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Welcome back! Logging you in...');
      } else if (methods.length === 0) {
        await createUserWithEmailAndPassword(auth, email, password);
        subscribeToNotifications(email);
        setSuccess('Account created successfully!');
      } else {
        setError('This email is linked with another provider (e.g., Google).');
        return;
      }

      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in instead.');
          break;
        default:
          setError('Authentication failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isNew = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      if (isNew && result.user.email) subscribeToNotifications(result.user.email);
      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');
    } catch {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError('Please enter your email first.');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent!');
    } catch {
      setError('Failed to send password reset link.');
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left visual side */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="/loginpage.png"
          alt="Fashion model"
          fill
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-12 left-10 text-white space-y-2"
        >
          <h2 className="text-4xl font-bold">Style. Fit. Confidence.</h2>
          <p className="text-sm text-gray-200 max-w-sm">
            Join the PerfectFit revolution — where technology meets tailoring.
          </p>
        </motion.div>
      </div>

      {/* Right form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          className="w-full max-w-sm space-y-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Logo + Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[2px] rounded-full w-fit">
              <div className="bg-background p-3 rounded-full">
                <Logo isSpinning />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
              Welcome to PerfectFit
            </h1>
            <p className="text-muted-foreground text-sm">
              {userType === 'tailor'
                ? 'Tailor Dashboard Access'
                : 'Create your account or log in to continue.'}
            </p>
          </div>

          {/* User Role */}
          <RadioGroup
            defaultValue="customer"
            onValueChange={(v) => setUserType(v as 'customer' | 'tailor')}
            className="grid grid-cols-2 gap-4"
          >
            <Label
              htmlFor="customer"
              className={`p-3 border rounded-md flex items-center justify-center gap-2 cursor-pointer ${
                userType === 'customer' ? 'border-primary bg-muted/30' : ''
              }`}
            >
              <RadioGroupItem value="customer" id="customer" /> Customer
            </Label>
            <Label
              htmlFor="tailor"
              className={`p-3 border rounded-md flex items-center justify-center gap-2 cursor-pointer ${
                userType === 'tailor' ? 'border-primary bg-muted/30' : ''
              }`}
            >
              <RadioGroupItem value="tailor" id="tailor" /> Tailor
            </Label>
          </RadioGroup>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {userType === 'tailor' && (
              <Input type="text" placeholder="Unique Tailor Code" required />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue with Email'}
            </Button>
          </form>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Status Messages */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-green-500 text-center">{success}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}
