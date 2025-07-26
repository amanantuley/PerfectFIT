'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currentUser = userCredential.user;
      if (!currentUser.emailVerified) {
        setUser(currentUser); // To show email verification button
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Try again later.');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;
      if (!currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        setError('Unauthorized domain. Add your domain in Firebase console.');
      } else {
        setError('Google login failed. Please try again.');
      }
    }
  };

  const handleSendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        setVerificationSent(true);
      } catch (error) {
        console.error('Error sending verification email:', error);
        setError('Failed to send verification email.');
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>

            {user && !user.emailVerified && (
              <div className="mt-2 text-center">
                <p className="text-sm text-yellow-600">
                  Your email is not verified.
                </p>
                {!verificationSent ? (
                  <Button
                    type="button"
                    onClick={handleSendVerification}
                    className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Send Verification Email
                  </Button>
                ) : (
                  <p className="text-green-600 mt-2">
                    Verification email sent. Check your inbox!
                  </p>
                )}
              </div>
            )}

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="underline font-semibold text-primary"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://placehold.co/1080x1920.png"
          alt="A stylish person wearing tailored clothes"
          fill
          className="object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  );
}
