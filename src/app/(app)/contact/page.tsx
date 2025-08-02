'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from './actions';
import React, { useEffect, useRef } from 'react';

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Send Message
    </Button>
  );
}

export default function ContactUsPage() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(submitContact, initialState);

    useEffect(() => {
      if (state.message) {
        if (state.error) {
          toast({
            variant: 'destructive',
            title: 'Submission Error',
            description: state.message,
          });
        } else {
          toast({
            title: 'Message Sent!',
            description: "Thanks for reaching out. We'll get back to you shortly.",
          });
          formRef.current?.reset();
        }
      }
    }, [state, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Contact Information</CardTitle>
          <CardDescription>
            Get in touch with us through any of the following channels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">support@perfectfit.com</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 mt-1 text-primary"/>
                <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">123 Fashion Ave, Style City, 10001</p>
                </div>
            </div>
        </CardContent>
       </Card>
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Send us a Message</CardTitle>
          <CardDescription>
            Have a question or feedback? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your Name" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message..." required/>
                </div>
                <SubmitButton />
            </form>
        </CardContent>
       </Card>
    </div>
  );
}
