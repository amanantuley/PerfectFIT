
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
    <div className="flex justify-center items-start">
       <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">My Profile</CardTitle>
          <CardDescription>
            Update your personal information, address, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction