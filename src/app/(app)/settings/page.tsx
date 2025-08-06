
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

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-6" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save All Settings
    </Button>
  );
}

export default function SettingsPage() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(submitSettings, initialState);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
      if (state.message) {
        if (state.error) {
          toast({
            variant: 'destructive',
            title: 'Update Error',
            description: state.message,
          });
        } else {
          toast({
            title: 'Settings Saved!',
            description: state.message,
          });
        }
      }
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
                toast({
                    title: 'Thanks for sharing!',
                });
            } catch (err) {
                // This can happen if the user cancels the share dialog, so we'll just log it.
                console.log('Share dismissed or failed:', err);
            }
        } else {
            // Fallback for browsers that don't support navigator.share
            try {
                await navigator.clipboard.writeText(shareData.url);
                toast({
                    title: 'Link Copied!',
                    description: 'A link to the app has been copied to your clipboard.',
                });
            } catch (err) {
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
            title: 'File Submitted',
            description: 'Your document has been submitted for verification.',
        });
    }

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
    <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Settings</CardTitle>
        <CardDescription>
            Manage your account settings and preferences.
        </CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-8">
                
                {/* Notification Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="space-y-4 rounded-md border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="emailNotifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates and order confirmations via email.</p>
                            </div>
                            <Switch id="emailNotifications" name="emailNotifications" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="pushNotifications">Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Get real-time alerts on your mobile device.</p>

                            </div>
                            <Switch id="pushNotifications" name="pushNotifications" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="offersNotifications">Offers & Promotions</Label>
                                <p className="text-sm text-muted-foreground">Be the first to know about special deals.</p>
                            </div>
                            <Switch id="offersNotifications" name="offersNotifications" />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Appearance</h3>
                    </div>
                    <div className="space-y-2 rounded-md border p-4">
                        <Label htmlFor="theme">Theme</Label>
                        <Select name="theme" value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
                            <SelectTrigger id="theme">
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">Choose how PerfectFit looks on your device.</p>
                    </div>
                </div>

                {/* Language Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Language</h3>
                    </div>
                    <div className="space-y-2 rounded-md border p-4">
                        <Label htmlFor="language">Language</Label>
                        <Select name="language" defaultValue="en-us">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en-us">English (United States)</SelectItem>
                                <SelectItem value="es">Español (Spanish)</SelectItem>
                                <SelectItem value="fr">Français (French)</SelectItem>
                                <SelectItem value="de">Deutsch (German)</SelectItem>
                                <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">Select your preferred language.</p>
                    </div>
                </div>

                 {/* Identity Verification */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Identity Verification</h3>
                    </div>
                    <Card className="bg-muted/30">
                        <CardContent className="p-4 space-y-4">
                             <p className="text-sm text-muted-foreground">For security and to enable certain features like high-value rentals, we may require identity verification.</p>
                            <div className="space-y-2">
                                <Label htmlFor="photo-id">Photo ID (Passport, Driver's License)</Label>
                                <Input id="photo-id" type="file" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="proof-of-address">Proof of Address (Utility Bill)</Label>
                                <Input id="proof-of-address" type="file" />
                            </div>
                            <Button type="button" variant="secondary" className="w-full" onClick={handleIdUpload}>
                                Submit for Verification
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Share Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Share2 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Share PerfectFit</h3>
                    </div>
                    <Card className="bg-muted/30">
                        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-muted-foreground">
                                Love our app? Share it with friends!
                            </p>
                            <Button type="button" variant="outline" onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <SubmitButton />
                </div>
            </form>
        </CardContent>
    </Card>
    </div>
  );
}
