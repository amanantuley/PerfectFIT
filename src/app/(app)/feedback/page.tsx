"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { submitFeedback } from "./actions";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  message: "",
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full font-medium text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 hover:opacity-90 transition-all"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>Submit Feedback</>
      )}
    </Button>
  );
}

export default function FeedbackPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitFeedback, initialState);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: "destructive",
          title: "Submission Error",
          description: state.message,
        });
      } else {
        toast({
          title: "🎉 Feedback Sent!",
          description: "Thanks for helping us improve PerfectFit 💜",
        });
        formRef.current?.reset();
        setRating(5);
      }
    }
  }, [state, toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center min-h-[90vh] p-4 sm:p-6 bg-gradient-to-b from-background via-background/80 to-background/50"
    >
      <Card className="w-full max-w-2xl shadow-2xl border border-muted/40 bg-background/70 backdrop-blur-lg rounded-2xl">
        <CardHeader className="text-center space-y-4 pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-fit mx-auto bg-primary/10 p-4 rounded-full"
          >
            <Star className="w-8 h-8 text-primary" />
          </motion.div>

          <CardTitle className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Share Your Feedback
          </CardTitle>

          <CardDescription className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
            We value your opinion — help us make PerfectFit even better.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form ref={formRef} action={formAction} className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Aman Antuley"
                  required
                  className="focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3 text-center">
              <Label className="text-base font-medium">Overall Rating</Label>
              <RadioGroup
                name="rating"
                value={rating.toString()}
                onValueChange={(value) => setRating(Number(value))}
                className="flex justify-center gap-3 sm:gap-4 flex-wrap"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Label
                    key={star}
                    htmlFor={`rating-${star}`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="cursor-pointer p-3 sm:p-4 rounded-xl border hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 flex flex-col items-center space-y-2"
                  >
                    <RadioGroupItem
                      value={star.toString()}
                      id={`rating-${star}`}
                      className="sr-only"
                    />
                    <Star
                      className={`w-8 h-8 transition-colors duration-300 ${
                        (hoveredStar ?? rating) >= star
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-xs font-medium">{star}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Your Feedback</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your experience with PerfectFit..."
                required
                minLength={10}
                className="min-h-[120px] resize-none focus-visible:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <SubmitButton />
          </form>
        </CardContent>

        <div className="border-t border-muted/40 text-center py-4 text-sm text-muted-foreground">
          💡 Your feedback helps us tailor the future of fashion.
        </div>
      </Card>
    </motion.div>
  );
}
