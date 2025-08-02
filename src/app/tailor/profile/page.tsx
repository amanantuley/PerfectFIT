

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, Star, Verified, Landmark } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const SewingPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16.5 3.5c-1.9 1.9-1.9 5.1 0 7l5 5-7 7-5-5c-1.9-1.9-5.1-1.9-7 0" />
        <path d="m15 8 7 7" />
    </svg>
);

export default function TailorProfilePage() {
    const { toast } = useToast();
    const [avatarPreview, setAvatarPreview] = useState("https://placehold.co/100x100.png");
    const [isLoading, setIsLoading] = useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Profile Updated!',
                description: 'Your changes have been saved successfully.',
            });
        }, 1500);
    };

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
       <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Tailor Profile</CardTitle>
          <CardDescription>
            This information will be displayed to customers. Keep it up-to-date.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarPreview} alt="Tailor Avatar" data-ai-hint="person avatar" />
                            <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                            <Camera className="h-4 w-4" />
                            <Input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
                        </Label>
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="text-xl font-bold flex items-center gap-2">John "The Stitch" Doe <Verified className="h-5 w-5 text-blue-500"/></h3>
                        <p className="text-muted-foreground">tailor.doe@example.com</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                           <Star className="h-4 w-4 fill-current" />
                           <Star className="h-4 w-4 fill-current" />
                           <Star className="h-4 w-4 fill-current" />
                           <Star className="h-4 w-4 fill-current" />
                           <Star className="h-4 w-4 " />
                           <span className="text-muted-foreground text-sm ml-1">(125 reviews)</span>
                        </div>
                    </div>
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input id="name" name="name" defaultValue='John "The Stitch" Doe' required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue="Downtown" required/>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea id="bio" name="bio" defaultValue="With over 20 years of experience in bespoke tailoring, I specialize in creating perfectly fitted suits and shirts. My passion is turning quality fabric into wearable art."/>
                    <p className="text-xs text-muted-foreground">A brief bio will help customers get to know you.</p>
                </div>
                
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"><SewingPinIcon /> My Specialties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="specialties">Specialties (comma-separated)</Label>
                            <Input id="specialties" name="specialties" placeholder="e.g. Wedding Suits, Business Attire, Custom Shirts" defaultValue="Bespoke Suits, Wedding Attire, Vintage Clothing Repair, Custom Shirts" />
                        </div>
                         <div className="flex items-center space-x-2">
                            <Switch id="rush-orders" />
                            <Label htmlFor="rush-orders">Accept Rush Orders</Label>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"><Landmark /> Banking Information</CardTitle>
                        <CardDescription>This information is kept private and secure. Used for payouts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" name="bankName" placeholder="e.g. Global Trust Bank" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="routing-number">Routing Number</Label>
                                <Input id="routing-number" name="routingNumber" placeholder="e.g. 123456789" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="account-number">Account Number</Label>
                                <Input id="account-number" name="accountNumber" placeholder="e.g. 987654321" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Profile
                </Button>
            </form>
        </CardContent>
       </Card>
    </div>
  );
}
