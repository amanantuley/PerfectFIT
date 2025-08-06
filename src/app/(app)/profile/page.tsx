
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitProfile } from './actions';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Update Profile
    </Button>
  );
}

export default function ProfilePage() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(submitProfile, initialState);
    const [avatarPreview, setAvatarPreview] = useState("https://placehold.co/100x100.png");

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
            title: 'Profile Updated!',
            description: state.message,
          });
          // Don't reset the form to keep the new values visible
        }
      }
    }, [state, toast]);

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
       <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">My Profile</CardTitle>
          <CardDescription>
            Update your personal information, address, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarPreview} alt="User Avatar" data-ai-hint="person avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                            <Camera className="h-4 w-4" />
                            <Input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
                        </Label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue="User" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue="user@example.com" required/>
                        </div>
                    </div>
                </div>

                <Separator />
                
                 <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input id="street" name="street" placeholder="123 Fashion Ave" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" placeholder="Style City" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" placeholder="NY" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" name="zip" placeholder="10001" />
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                     <h3 className="text-lg font-semibold">Change Password</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" name="currentPassword" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" name="newPassword" type="password" />
                        </div>
                    </div>
                </div>

                 <Separator />

                <div className="space-y-4">
                     <h3 className="text-lg font-semibold">Education (for Student Discount)</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="school">University/School</Label>
                            <Input id="school" name="school" placeholder="Fashion Institute of Technology" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="degree">Degree</Label>
                            <Input id="degree" name="degree" placeholder="B.S." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="field-of-study">Field of Study</Label>
                            <Input id="field-of-study" name="fieldOfStudy" placeholder="Fashion Design" />
                        </div>
                    </div>
                </div>

                <SubmitButton />
            </form>
        </CardContent>
       </Card>
    </div>
  );
}
