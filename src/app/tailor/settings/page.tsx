
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bell, Palette, Languages } from 'lucide-react';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { useTranslation } from '@/context/translation-provider';

export default function TailorSettingsPage() {
    const { t, setLanguage, language } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { theme, setTheme } = useTheme();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: t('Settings Saved!'),
                description: t('Your preferences have been updated.'),
            });
        }, 1500);
    };

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
    <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
        <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">{t('Settings')}</CardTitle>
        <CardDescription>
            {t('Manage your account and notification preferences.')}
        </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Notification Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{t('Notifications')}</h3>
                    </div>
                    <div className="space-y-4 rounded-md border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="emailNotifications">{t('New Order Alerts')}</Label>
                                <p className="text-sm text-muted-foreground">{t('Receive an email for every new order.')}</p>
                            </div>
                            <Switch id="emailNotifications" name="emailNotifications" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="pushNotifications">{t('Customer Messages')}</Label>
                                <p className="text-sm text-muted-foreground">{t('Get notified when a customer sends you a message.')}</p>

                            </div>
                            <Switch id="pushNotifications" name="pushNotifications" defaultChecked />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{t('Appearance')}</h3>
                    </div>
                    <div className="space-y-2 rounded-md border p-4">
                        <Label htmlFor="theme">{t('Theme')}</Label>
                        <Select name="theme" value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
                            <SelectTrigger id="theme">
                                <SelectValue placeholder={t('Select a theme')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">{t('Light')}</SelectItem>
                                <SelectItem value="dark">{t('Dark')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">{t('Choose how the dashboard looks on your device.')}</p>
                    </div>
                </div>

                {/* Language Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{t('Language')}</h3>
                    </div>
                    <div className="space-y-2 rounded-md border p-4">
                        <Label htmlFor="language">{t('Language')}</Label>
                        <Select name="language" value={language} onValueChange={(value) => setLanguage(value as any)}>
                            <SelectTrigger id="language">
                                <SelectValue placeholder={t('Select a language')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">{t('English')}</SelectItem>
                                <SelectItem value="hi">{t('Hindi')}</SelectItem>
                                <SelectItem value="mr">{t('Marathi')}</SelectItem>
                                <SelectItem value="ur">{t('Urdu')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">{t('Select your preferred language for the dashboard.')}</p>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit" className="mt-6" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('Save All Settings')}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
    </div>
  );
}
