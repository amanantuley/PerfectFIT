'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bell, Palette, Languages, Share2, FileCheck } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitSettings } from './actions';
import React, { useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const initialState = { message: '', error: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="mt-8 w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90 transition-all"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Saving...' : 'Save All Settings'}
    </Button>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitSettings, initialState);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!state.message) return;
    toast({
      variant: state.error ? 'destructive' : 'default',
      title: state.error ? 'Update Error' : '✅ Settings Saved!',
      description: state.message,
    });
  }, [state, toast]);

  const handleShare = async () => {
    const shareData = {
      title: 'PerfectFit',
      text: 'Check out PerfectFit! Redefining Tailoring with Artificial Intelligence.',
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({ title: 'Thanks for sharing!' });
      } catch (err) {
        console.log('Share dismissed or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'A link to PerfectFit has been copied to your clipboard.',
        });
      } catch {
        toast({
          variant: 'destructive',
          title: 'Copy Failed',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  const handleIdUpload = () => {
    toast({
      title: '🪪 File Submitted',
      description: 'Your documents have been submitted for verification.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-start py-8 px-4 bg-gradient-to-b from-background via-background/60 to-background/30"
    >
      <Card className="w-full max-w-2xl shadow-2xl border border-border/30 backdrop-blur-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences, appearance, and security options.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-10">
            
            {/* 🔔 Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="space-y-4 rounded-md border p-4 bg-muted/20">
                {[
                  {
                    id: 'emailNotifications',
                    label: 'Email Notifications',
                    desc: 'Receive updates and order confirmations via email.',
                    defaultChecked: true,
                  },
                  {
                    id: 'pushNotifications',
                    label: 'Push Notifications',
                    desc: 'Get real-time alerts on your mobile device.',
                    defaultChecked: true,
                  },
                  {
                    id: 'offersNotifications',
                    label: 'Offers & Promotions',
                    desc: 'Be the first to know about special deals.',
                    defaultChecked: false,
                  },
                ].map((item, i) => (
                  <React.Fragment key={item.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch id={item.id} name={item.id} defaultChecked={item.defaultChecked} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* 🎨 Appearance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Appearance</h3>
              </div>
              <div className="space-y-3 rounded-md border p-4 bg-muted/20">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  name="theme"
                  value={theme}
                  onValueChange={(value) => setTheme(value as 'light' | 'dark')}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose how PerfectFit looks on your device.
                </p>
              </div>
            </motion.div>

            {/* 🌍 Language */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Language</h3>
              </div>
              <div className="space-y-3 rounded-md border p-4 bg-muted/20">
                <Label htmlFor="language">Preferred Language</Label>
                <Select name="language" defaultValue="en-us">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-us">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* 🪪 Identity Verification */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Identity Verification</h3>
              </div>
              <Card className="bg-muted/30 border border-muted/40">
                <CardContent className="p-5 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    For secure access and high-value rentals, ID verification may be required.
                  </p>
                  {[
                    { id: 'photo-id', label: "Photo ID (Passport, Driver's License)" },
                    { id: 'proof-of-address', label: 'Proof of Address (Utility Bill)' },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input id={field.id} type="file" />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={handleIdUpload}
                  >
                    Submit for Verification
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 🤝 Share App */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Share PerfectFit</h3>
              </div>
              <Card className="bg-muted/30 border border-muted/40">
                <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    Love PerfectFit? Share it with your friends!
                  </p>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
