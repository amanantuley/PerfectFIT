'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Bell,
  Palette,
  Languages,
  Share2,
  FileCheck,
  ShieldCheck,
  Lock,
  Smartphone,
  CloudDownload,
  KeyRound,
  Database,
  Mail,
  Phone,
} from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitSettings } from './actions';
import React, { useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
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
      <Card className="w-full max-w-5xl shadow-2xl border border-border/30 backdrop-blur-md rounded-2xl">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Control Center
              </CardTitle>
              <CardDescription>Security, experience, and communication in one place.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1 bg-primary/5 border-primary/20 text-primary">
                <ShieldCheck className="h-4 w-4" /> Secure by design
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <KeyRound className="h-4 w-4" /> SSO supported
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[{ label: 'MFA', value: 'Enabled', icon: Lock }, { label: 'Sessions', value: '2 active', icon: Smartphone }, { label: 'Data export', value: 'Ready', icon: CloudDownload }, { label: 'Language', value: 'English (US)', icon: Languages }].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-xl border border-muted/30 bg-background/70 px-4 py-3 shadow-sm">
                  <span className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-10">
            {/* 🔒 Security */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Security</h3>
              </div>
              <div className="space-y-3">
                {[{ id: 'mfaEnabled', label: 'Multi-factor authentication', desc: 'Protect sign-ins with an additional verification step.', defaultChecked: true }, { id: 'loginAlerts', label: 'Login alerts', desc: 'Email and push notifications on new device logins.', defaultChecked: true }].map((item, i) => (
                  <React.Fragment key={item.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch id={item.id} name={item.id} defaultChecked={item.defaultChecked} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* 🔔 Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="space-y-3">
                {[{ id: 'emailNotifications', label: 'Email notifications', desc: 'Receive updates and order confirmations via email.', defaultChecked: true }, { id: 'pushNotifications', label: 'Push notifications', desc: 'Get real-time alerts on your mobile device.', defaultChecked: true }, { id: 'offersNotifications', label: 'Offers & promotions', desc: 'Be the first to know about special deals.', defaultChecked: false }].map((item, i) => (
                  <React.Fragment key={item.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch id={item.id} name={item.id} defaultChecked={item.defaultChecked} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* 🎨 Appearance & Language */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Appearance & Language</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="theme">Theme</Label>
                  <Select name="theme" value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Choose how PerfectFit looks on your device.</p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="language">Preferred language</Label>
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
                  <p className="text-sm text-muted-foreground">We localize tailoring tips and support content.</p>
                </div>
              </div>
            </motion.div>

            {/* 📡 Communication */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Communication</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="digest-frequency">Update frequency</Label>
                  <Select name="digestFrequency" defaultValue="weekly">
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time alerts</SelectItem>
                      <SelectItem value="daily">Daily summary</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Pick how often we send updates and tailoring insights.</p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="backup-email">Backup email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="backup-email" name="backupEmail" type="email" placeholder="backup@perfectfit.com" />
                  </div>
                  <Label htmlFor="backup-phone" className="text-sm text-muted-foreground">Backup phone (for OTP)</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input id="backup-phone" name="backupPhone" type="tel" placeholder="+91 90000 00000" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 🔐 Privacy & Data */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Privacy & Data</h3>
              </div>
              <div className="space-y-3">
                {[{ id: 'personalization', label: 'AI personalization', desc: 'Use your fit history to tailor recommendations.', defaultChecked: true }, { id: 'dataShare', label: 'Limit data sharing', desc: 'Restrict third-party analytics to essentials only.', defaultChecked: true }].map((item, i) => (
                  <React.Fragment key={item.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch id={item.id} name={item.id} defaultChecked={item.defaultChecked} />
                    </div>
                  </React.Fragment>
                ))}
                <div className="grid gap-3 sm:grid-cols-2 pt-3">
                  <Button type="button" variant="outline" className="w-full" onClick={() => toast({ title: 'Export requested', description: 'We will email your data export link shortly.' })}>
                    <CloudDownload className="mr-2 h-4 w-4" /> Export data
                  </Button>
                  <Button type="button" variant="secondary" className="w-full" onClick={() => toast({ title: 'Deletion requested', description: 'Our team will confirm within 24 hours.' })}>
                    <ShieldCheck className="mr-2 h-4 w-4" /> Request deletion
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* 🪪 Identity Verification */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Identity Verification</h3>
              </div>
              <Card className="bg-muted/20 border border-muted/40">
                <CardContent className="p-5 space-y-4">
                  <p className="text-sm text-muted-foreground">For secure access and high-value rentals, ID verification may be required.</p>
                  {[{ id: 'photo-id', label: "Photo ID (Passport, Driver's License)" }, { id: 'proof-of-address', label: 'Proof of Address (Utility Bill)' }].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input id={field.id} name={field.id} type="file" />
                    </div>
                  ))}
                  <Button type="button" variant="secondary" className="w-full" onClick={handleIdUpload}>
                    Submit for verification
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* 🤝 Share App */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4 rounded-2xl border border-muted/30 bg-muted/10 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Share PerfectFit</h3>
              </div>
              <Card className="bg-muted/20 border border-muted/40">
                <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground text-center sm:text-left">Love PerfectFit? Share it with your friends!</p>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
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
