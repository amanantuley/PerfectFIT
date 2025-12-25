'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Loader2, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'tailor'>('customer');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 5);
  };

  const strength = passwordStrength(password);

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
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
        if (strength < 3) {
          setError('Please use a stronger password (8+ chars with letters and numbers).');
          return;
        }
        if (!termsAccepted) {
          setError('You must accept the Terms and Privacy Policy to continue.');
          return;
        }
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
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-background">
        <motion.div
          className="w-full max-w-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-2xl border-border/50 backdrop-blur-md">
            <CardHeader className="space-y-2">
              <div className="mx-auto bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[2px] rounded-full w-fit">
                <div className="bg-background p-3 rounded-full">
                  <Logo isSpinning />
                </div>
              </div>
              <CardTitle className="text-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">Welcome to PerfectFit</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                {userType === 'tailor' ? 'Tailor Dashboard Access' : 'Create your account or log in to continue.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Role selector */}
              <RadioGroup
                defaultValue="customer"
                onValueChange={(v) => setUserType(v as 'customer' | 'tailor')}
                className="grid grid-cols-2 gap-3"
              >
                <Label
                  htmlFor="customer"
                  className={`p-3 border rounded-md flex items-center justify-center gap-2 cursor-pointer ${userType === 'customer' ? 'border-primary bg-muted/30' : ''}`}
                >
                  <RadioGroupItem value="customer" id="customer" /> Customer
                </Label>
                <Label
                  htmlFor="tailor"
                  className={`p-3 border rounded-md flex items-center justify-center gap-2 cursor-pointer ${userType === 'tailor' ? 'border-primary bg-muted/30' : ''}`}
                >
                  <RadioGroupItem value="tailor" id="tailor" /> Tailor
                </Label>
              </RadioGroup>

              {/* Social */}
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
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or</span></div>
              </div>

              {/* Form */}
              <form onSubmit={handleAuth} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
                    <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  <div className="h-1.5 rounded bg-muted overflow-hidden">
                    <div className={`${strength >= 1 ? 'bg-red-500' : 'bg-transparent'} h-full`} style={{ width: `${Math.max(strength, 1) * 20}%` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Use at least 8 characters, with letters and numbers.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <div className="relative">
                    <Input id="confirm" type={showConfirmPassword ? 'text' : 'password'} placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="pr-10" />
                    <button type="button" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} onClick={() => setShowConfirmPassword((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-muted-foreground hover:text-foreground">
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-[12px] text-red-500">Passwords do not match.</p>
                  )}
                </div>

                {userType === 'tailor' && (
                  <div className="space-y-2">
                    <Label htmlFor="tailorcode">Unique Tailor Code</Label>
                    <Input id="tailorcode" type="text" placeholder="Enter your tailor code" required />
                  </div>
                )}

                <div className="flex items-start gap-2 pt-1">
                  <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(v) => setTermsAccepted(Boolean(v))} />
                  <Label htmlFor="terms" className="text-xs text-muted-foreground">
                    I agree to the <Link className="text-primary hover:underline" href="/terms-of-service">Terms</Link> and <Link className="text-primary hover:underline" href="/privacy-policy">Privacy Policy</Link>.
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue with Email'}
                </Button>
              </form>

              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={handleForgotPassword} className="text-primary hover:underline">Forgot password?</button>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">Have an account? Log in</Link>
              </div>

              {/* Trust row */}
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" />Secure</div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1"><Sparkles className="h-3.5 w-3.5 text-primary" />No spam</div>
                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">Easy unsubscribe</div>
              </div>

              {/* Status Messages */}
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              {success && <p className="text-sm text-green-500 text-center">{success}</p>}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
