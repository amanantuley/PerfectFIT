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
import { Loader2, Star, Zap, Heart, AlertCircle, MessageSquare, TrendingUp, ShieldCheck } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { submitFeedback } from "./actions";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const initialState = {
  message: "",
  error: false,
};

type FeedbackCategory = 'sizing' | 'fit' | 'shipping' | 'rental' | 'support' | 'other';

const CATEGORY_ICONS: Record<FeedbackCategory, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  sizing: Zap,
  fit: Heart,
  shipping: TrendingUp,
  rental: MessageSquare,
  support: MessageSquare,
  other: AlertCircle,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full font-medium text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 hover:opacity-90 transition-all h-11 text-base"
      disabled={pending}
      size="lg"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting feedback...
        </>
      ) : (
        <>
          <Heart className="mr-2 h-4 w-4" />
          Share Your Insight
        </>
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
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory>('other');

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

          <CardDescription className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every insight helps us refine AI accuracy, delivery speed, and fit quality. Your voice shapes our roadmap.
          </CardDescription>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">🔍 Read within 24 hours</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">✅ Action feedback reviewed weekly</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">🎯 Product team monitors trends</span>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form ref={formRef} action={formAction} className="space-y-6">
            {/* Category */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Feedback Category</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['sizing', 'fit', 'shipping', 'rental', 'support', 'other'] as FeedbackCategory[]).map((cat) => {
                  const Icon = CATEGORY_ICONS[cat];
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 text-sm font-medium ${
                        selectedCategory === cat
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted hover:border-primary/40 text-muted-foreground hover:bg-muted/40'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="capitalize text-xs">{cat}</span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="category" value={selectedCategory} />
            </div>

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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Experience Rating</Label>
                <span className="text-sm text-muted-foreground">({rating}/5 stars)</span>
              </div>
              <RadioGroup
                name="rating"
                value={rating.toString()}
                onValueChange={(value) => setRating(Number(value))}
                className="flex gap-2 sm:gap-3 flex-wrap"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Label
                    key={star}
                    htmlFor={`rating-${star}`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="cursor-pointer p-2 rounded-lg border hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 flex flex-col items-center space-y-1 flex-1"
                  >
                    <RadioGroupItem
                      value={star.toString()}
                      id={`rating-${star}`}
                      className="sr-only"
                    />
                    <Star
                      className={`w-6 h-6 transition-colors duration-300 ${
                        (hoveredStar ?? rating) >= star
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">{star}</span>
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

        <div className="border-t border-muted/40 py-6 px-6 sm:px-8 bg-gradient-to-r from-primary/5 via-background to-primary/5">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p><strong>Privacy First:</strong> Feedback is confidential. We never share personal data or publicly quote responses without consent.</p>
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p><strong>Real Impact:</strong> Feedback directly influences quarterly roadmap updates and feature prioritization.</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
