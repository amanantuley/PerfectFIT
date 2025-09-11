
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Star } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitFeedback } from './actions';
import React, { useEffect, useRef, useState } from 'react';

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit Feedback
    </Button>
  );
}

export default function FeedbackPage() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(submitFeedback, initialState);
    const [rating, setRating] = useState(5);

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
            title: 'Feedback Sent!',
            description: "Thanks for helping us improve.",
          });
          formRef.current?.reset();
          setRating(5);
        }
      }
    }, [state, toast]);

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
       <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Share Your Feedback</CardTitle>
          <CardDescription>
            We value your opinion. Let us know how we can improve.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your Name" required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="your@email.com" required/>
                    </div>
                </div>

                 <div className="space-y-3">
                    <Label>Overall Rating</Label>
                     <RadioGroup name="rating" value={rating.toString()} onValueChange={(value) => setRating(Number(value))} className="flex flex-wrap gap-4 justify-center">
                       {[1,2,3,4,5].map(star => (
                           <Label key={star} htmlFor={`rating-${star}`} className="flex flex-col items-center gap-2 cursor-pointer p-2 rounded-md transition-colors hover:bg-muted">
                               <RadioGroupItem value={star.toString()} id={`rating-${star}`} className="sr-only" />
                               <Star className={`h-8 w-8 transition-colors ${rating >= star ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                               <span className="text-xs font-medium">{star}</span>
                           </Label>
                       ))}
                    </RadioGroup>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your experience..." required minLength={10}/>
                </div>
                <SubmitButton />
            </form>
        </CardContent>
       </Card>
    </div>
  );
}
