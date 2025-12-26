'use client';

import {
  Button
} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Input
} from '@/components/ui/input';
import {
  Label
} from '@/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Separator
} from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Loader2, Camera, Trash2, User, MapPin, Lock, Mail, ShieldCheck, Activity, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFormState, useFormStatus } from 'react-dom';
import { submitProfile, deleteAccount } from './actions';
import { auth } from '@/lib/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const initialState = { message: '', error: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Updating...' : 'Update Profile'}
    </Button>
  );
}

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitProfile, initialState);

  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName || 'User');
        setUserEmail(user.email || '');
        setAvatarPreview(user.photoURL || 'https://placehold.co/100x100?text=User');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setAvatarPreview(base64);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { photoURL: base64 });
        toast({
          title: 'Profile Picture Updated',
          description: 'Your avatar has been successfully updated.',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (!result.error) {
      await signOut(auth);
      toast({
        title: 'Account Deleted',
        description: result.message,
      });
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Deleting Account',
        description: result.message,
      });
    }
  };

  useEffect(() => {
    if (!state.message) return;
    toast({
      variant: state.error ? 'destructive' : 'default',
      title: state.error ? 'Update Error' : 'Profile Updated!',
      description: state.message,
    });
  }, [state, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-muted-foreground">
        <Loader2 className="h-6 w-6 mr-2 animate-spin" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-muted/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 sm:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
        <div className="relative space-y-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">Profile Management</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">Manage your personal information, shipping addresses, security settings, and account preferences.</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">🔒 Secure & Encrypted</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">✅ Auto-Save</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">📧 Email Verification</span>
          </div>
        </div>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Profile Info */}
        <Card className="lg:col-span-2 shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">Account Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>

          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-8">
              {/* Avatar + Basic Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg bg-muted/20 border border-muted/30">
                <div className="relative group">
                  <Avatar className="h-28 w-28 ring-4 ring-primary/20 shadow-xl transition-transform group-hover:scale-105">
                    <AvatarImage src={avatarPreview} alt="User Avatar" />
                    <AvatarFallback className="bg-primary/10">
                      <User className="h-12 w-12 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2.5 cursor-pointer hover:bg-primary/90 shadow-lg transition-all hover:scale-110"
                  >
                    <Camera className="h-4 w-4" />
                    <Input
                      id="avatar-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Label>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold">
                      <User className="h-4 w-4 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={userName}
                      readOnly
                      className="cursor-not-allowed bg-muted/40 border-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userEmail}
                      readOnly
                      className="cursor-not-allowed bg-muted/40 border-muted/50"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Shipping Address</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'street', label: 'Street Address', placeholder: '123 Fashion Ave' },
                    { id: 'city', label: 'City', placeholder: 'Style City' },
                    { id: 'state', label: 'State', placeholder: 'NY' },
                    { id: 'zip', label: 'ZIP Code', placeholder: '10001' },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="text-sm font-medium">{field.label}</Label>
                      <Input id={field.id} name={field.id} placeholder={field.placeholder} className="border-muted/50 focus:border-primary" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Password Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
                    <Input id="current-password" name="currentPassword" type="password" placeholder="••••••••" className="border-muted/50 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                    <Input id="new-password" name="newPassword" type="password" placeholder="••••••••" className="border-muted/50 focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right - Quick Stats & Info */}
        <div className="space-y-6">
          <Card className="shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Verified Account</p>
                  <p className="text-xs text-muted-foreground">Email confirmed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                <Activity className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Active</p>
                  <p className="text-xs text-muted-foreground">Last login: Today</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Member Since</p>
                  <p className="text-xs text-muted-foreground">2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="shadow-lg border-destructive/50 bg-destructive/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Deleting your account is permanent and cannot be undone. All your data will be removed.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full shadow-md">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                      Yes, delete my account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="border-t border-muted/40 py-6 px-6 sm:px-8 bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-lg">
        <div className="max-w-4xl space-y-3">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p><strong>Privacy Protected:</strong> Your personal information is encrypted and never shared with third parties without your consent.</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p><strong>Secure Storage:</strong> All passwords are hashed using industry-standard encryption. We never store plain-text passwords.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
