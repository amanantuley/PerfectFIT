'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Eye, EyeOff, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import Logo from '@/components/logo';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
    <path d="M12 5.16c1.54 0 2.92.52 3.99 1.58l3.15-3.15C17.45 1.8 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
  </svg>
);

interface AuthDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export function AuthDialog({ children, triggerClassName }: AuthDialogProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');
  const [tailorCode, setTailorCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  // Sync profile details with Firestore
  const syncUserProfile = async (user: any, selectedRole: 'customer' | 'tailor') => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'PerfectFit User',
          photoURL: user.photoURL || '',
          role: selectedRole,
          createdAt: new Date().toISOString(),
          totalOrders: 0,
          measurements: []
        });
      }
    } catch (e) {
      console.error('Failed to sync user profile:', e);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast({ variant: 'destructive', title: 'Passwords mismatch', description: 'Please make sure your passwords match.' });
          setIsLoading(false);
          return;
        }
        if (strength < 3) {
          toast({ variant: 'destructive', title: 'Weak password', description: 'Please choose a stronger password.' });
          setIsLoading(false);
          return;
        }
        if (!termsAccepted) {
          toast({ variant: 'destructive', title: 'Terms & Conditions', description: 'You must accept the Terms to sign up.' });
          setIsLoading(false);
          return;
        }
        if (userType === 'tailor' && !tailorCode) {
          toast({ variant: 'destructive', title: 'Tailor Code required', description: 'Please enter a valid unique Tailor Code.' });
          setIsLoading(false);
          return;
        }

        // Create user
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserProfile(credentials.user, userType);
        
        toast({ title: 'Welcome to PerfectFit!', description: 'Account created successfully!' });
      } else {
        // Log in
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        // Resolve or sync user profile
        await syncUserProfile(credentials.user, userType);
        
        toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
      }

      setIsOpen(false);
      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Authentication failed. Please check your credentials.';
      if (err.code === 'auth/wrong-password') {
        errMsg = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/user-not-found') {
        errMsg = 'No account found with this email.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email is already registered.';
      }
      toast({ variant: 'destructive', title: 'Authentication Error', description: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(result.user, userType);
      
      toast({ title: 'Logged in successfully', description: `Welcome, ${result.user.displayName || 'User'}!` });
      setIsOpen(false);
      router.push(userType === 'tailor' ? '/tailor/dashboard' : '/dashboard');
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Sign-in Failed', description: 'Google sign-in was cancelled or failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ variant: 'destructive', title: 'Email required', description: 'Please enter your email address to reset password.' });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: 'Reset email sent', description: 'Please check your inbox for password reset link.' });
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to send password reset email.' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className={triggerClassName}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md p-6 overflow-hidden border-border/50 bg-background/95 backdrop-blur-md shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-2 text-center flex flex-col items-center">
          <div className="mx-auto bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 p-[2px] rounded-full w-fit mb-2 shadow-lg shadow-purple-500/20">
            <div className="bg-background p-3 rounded-full">
              <Logo isSpinning />
            </div>
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm max-w-[300px]">
            {userType === 'tailor' ? 'Tailor Dashboard Gateway' : 'Sign in or create your profile to get perfect fits.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Animated Tab Switcher */}
          <div className="relative flex p-1 rounded-xl bg-secondary/50 border border-border/40">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-all ${mode === 'login' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg z-10 transition-all ${mode === 'signup' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Sign Up
            </button>
            <motion.div
              layout
              className="absolute inset-y-1 rounded-lg bg-background shadow-md border border-border/50"
              initial={false}
              animate={{
                x: mode === 'login' ? 4 : '101%',
                width: '48%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Role selector */}
          <RadioGroup
            defaultValue="customer"
            onValueChange={(v) => setUserType(v as 'customer' | 'tailor')}
            className="grid grid-cols-2 gap-3"
          >
            <Label
              htmlFor="dialog-customer"
              className={`p-3 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${userType === 'customer' ? 'border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300' : 'hover:bg-muted/40'}`}
            >
              <RadioGroupItem value="customer" id="dialog-customer" className="sr-only" />
              <span>Customer</span>
            </Label>
            <Label
              htmlFor="dialog-tailor"
              className={`p-3 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${userType === 'tailor' ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300' : 'hover:bg-muted/40'}`}
            >
              <RadioGroupItem value="tailor" id="dialog-tailor" className="sr-only" />
              <span>Tailor</span>
            </Label>
          </RadioGroup>

          {/* Social login */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-border/60 hover:bg-secondary/40 transition-all rounded-xl py-5"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
            <span className="font-semibold text-sm">Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground font-medium">or email</span></div>
          </div>

          {/* Form with animated height/fields */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="dialog-email" className="text-xs font-semibold">Email address</Label>
              <Input
                id="dialog-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-border/50 bg-secondary/20"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="dialog-password" className="text-xs font-semibold">Password</Label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-semibold text-purple-500 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="dialog-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 rounded-xl border-border/50 bg-secondary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 px-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {mode === 'signup' && password && (
                <div className="space-y-1.5 pt-1">
                  <div className="h-1 rounded bg-muted overflow-hidden flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded transition-colors ${
                          i < strength
                            ? strength <= 2
                              ? 'bg-red-500'
                              : strength <= 4
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                            : 'bg-muted-foreground/20'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Must include letters, numbers, and symbols.
                  </p>
                </div>
              )}
            </div>

            <AnimatePresence initial={false}>
              {mode === 'signup' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="space-y-1">
                    <Label htmlFor="dialog-confirm" className="text-xs font-semibold">Confirm password</Label>
                    <Input
                      id="dialog-confirm"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="rounded-xl border-border/50 bg-secondary/20"
                    />
                  </div>

                  {userType === 'tailor' && (
                    <div className="space-y-1">
                      <Label htmlFor="dialog-tailorcode" className="text-xs font-semibold">Unique Tailor Code</Label>
                      <Input
                        id="dialog-tailorcode"
                        type="text"
                        placeholder="Enter registration code"
                        value={tailorCode}
                        onChange={(e) => setTailorCode(e.target.value)}
                        required
                        className="rounded-xl border-border/50 bg-secondary/20"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-1">
                    <Checkbox
                      id="dialog-terms"
                      checked={termsAccepted}
                      onCheckedChange={(v) => setTermsAccepted(Boolean(v))}
                    />
                    <Label htmlFor="dialog-terms" className="text-[11px] leading-snug text-muted-foreground cursor-pointer">
                      I agree to the{' '}
                      <a target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline" href="/terms-of-service">
                        Terms
                      </a>{' '}
                      and{' '}
                      <a target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline" href="/privacy-policy">
                        Privacy Policy
                      </a>.
                    </Label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full py-6 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform active:scale-95 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
              )}
            </Button>
          </form>

          {/* Security details */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-border/40">
            <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              <span>Secure Connection</span>
            </div>
            <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-purple-500" />
              <span>Full Privacy</span>
            </div>
            <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
