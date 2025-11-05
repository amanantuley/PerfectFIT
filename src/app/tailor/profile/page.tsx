'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, Star, Verified, Landmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/context/translation-provider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SewingPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16.5 3.5c-1.9 1.9-1.9 5.1 0 7l5 5-7 7-5-5c-1.9-1.9-5.1-1.9-7 0" />
    <path d="m15 8 7 7" />
  </svg>
);

export default function TailorProfilePage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('https://placehold.co/100x100.png');
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    location: '',
    bio: '',
    specialties: '',
    rushOrders: false,
    bankName: '',
    routingNumber: '',
    accountNumber: '',
  });

  // ✅ Fetch tailor data by logged-in UID
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'tailors', user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          setFormData({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            location: data.location || '',
            bio: data.bio || '',
            specialties: data.specialties || '',
            rushOrders: data.rushOrders || false,
            bankName: data.bankName || '',
            routingNumber: data.routingNumber || '',
            accountNumber: data.accountNumber || '',
          });
          if (data.avatarUrl) setAvatarPreview(data.avatarUrl);
        } else {
          // First-time user — preload name/email
          setFormData({
            ...formData,
            name: user.displayName || '',
            email: user.email || '',
          });
        }
      }
    });

    return () => unsub();
  }, []);

  // ✅ Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated profile
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      toast({ title: 'Error', description: 'Please log in first.', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    try {
      await setDoc(
        doc(db, 'tailors', user.uid),
        {
          ...formData,
          avatarUrl: avatarPreview,
          email: formData.email || user.email,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      toast({ title: 'Profile Updated!', description: 'Your changes have been saved.' });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({ title: 'Error', description: 'Failed to update profile.', variant: 'destructive' });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            {t('Tailor Profile')}
          </CardTitle>
          <CardDescription>{t('This information will be displayed to customers. Keep it up-to-date.')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview} alt="Tailor Avatar" />
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                  <Input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
                </Label>
              </div>
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
                  {formData.name || 'Tailor'} <Verified className="h-5 w-5 text-blue-500" />
                </h3>
                <p className="text-muted-foreground">{formData.email || '—'}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <Star className="h-4 w-4" />
                  <span className="text-muted-foreground text-sm ml-1">({t('125 reviews')})</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('Display Name')}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t('Location')}</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t('Biography')}</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">{t('A brief bio will help customers get to know you.')}</p>
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <SewingPinIcon /> {t('My Specialties')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialties">{t('Specialties (comma-separated)')}</Label>
                  <Input id="specialties" name="specialties" value={formData.specialties} onChange={handleChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="rushOrders" checked={formData.rushOrders} onCheckedChange={(v) => setFormData({ ...formData, rushOrders: v })} />
                  <Label htmlFor="rushOrders">{t('Accept Rush Orders')}</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Landmark /> {t('Banking Information')}
                </CardTitle>
                <CardDescription>{t('This information is kept private and secure. Used for payouts.')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">{t('Bank Name')}</Label>
                  <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">{t('Routing Number')}</Label>
                    <Input id="routingNumber" name="routingNumber" value={formData.routingNumber} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">{t('Account Number')}</Label>
                    <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('Update Profile')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
