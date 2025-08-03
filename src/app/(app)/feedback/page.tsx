
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
      Submit Feedback
    </Button>
  );
}

export default function FeedbackPage() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(submitFeedback, initialState);

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
        }
      }
    }, [state, toast]);

  return (
    <div className="flex justify-center items-start animate-fade-in-up">
       <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-rainbow">Share Your Feedback</CardTitle>
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

                 <div className="space-y-2">
                    <Label>Overall Rating</Label>
                    <RadioGroup name="rating" defaultValue="5" className="flex flex-wrap gap-4">
                       {[1,2,3,4,5].map(rating => (
                           <Label key={rating} htmlFor={`rating-${rating}`} className="flex flex-col items-center gap-2 cursor-pointer">
                               <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="sr-only" />
                               <div className="p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary">
                                 <Star className="h-6 w-6 peer-data-[state=checked]:text-primary peer-data-[state=checked]:fill-primary text-muted-foreground" />
                               </div>
                               <span className="text-sm">{rating}</span>
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
