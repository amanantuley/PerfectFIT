'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';
import { useState } from 'react';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <Chrome className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline font-semibold text-primary">
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