'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tag,
  Percent,
  Sparkles,
  ShoppingBag,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';

const offers = [
  {
    title: 'First-Time Renter Discount',
    description:
      'Get 25% off your first rental order — the perfect way to try our AI tailoring service.',
    code: 'RENT25',
    icon: Percent,
  },
  {
    title: 'Suit Up for Less',
    description:
      'Buy any two suits and get the third one at 50% off. Tailored perfection made affordable.',
    code: 'SUITS50',
    icon: Tag,
  },
  {
    title: 'Free Alterations',
    description:
      'All purchased garments come with one free alteration to ensure your perfect fit.',
    code: 'No code needed',
    icon: Sparkles,
  },
  {
    title: 'Seasonal Sale: Summer Styles',
    description:
      'Get up to 30% off on our lightweight summer collection — perfect for the season.',
    code: 'SUMMER30',
    icon: Tag,
  },
  {
    title: 'Bundle & Save: The Weekender',
    description:
      'Rent one suit and two shirts for a weekend getaway and save 20% on the total rental price.',
    code: 'WEEKEND20',
    icon: ShoppingBag,
  },
  {
    title: 'Student Discount',
    description:
      'Students get 15% off all year round. Just verify your ID once and enjoy exclusive perks.',
    code: 'STUDENT15',
    icon: Percent,
  },
];

export default function OffersPage() {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (code === 'No code needed') return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: '✅ Code Copied!',
      description: `"${code}" has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-10 bg-gradient-to-b from-background via-background/80 to-background/50"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow drop-shadow-sm">
          Exclusive Offers
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock premium deals crafted for your perfect fit — limited-time
          offers designed to elevate your experience.
        </p>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {offers.map((offer, index) => {
          const Icon = offer.icon;
          return (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="group relative flex flex-col justify-between h-full border border-muted/30 shadow-md hover:shadow-2xl hover:border-primary/40 transition-all duration-300 bg-background/70 backdrop-blur-sm rounded-2xl overflow-hidden">
                {/* Glow hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-sky-500/10 pointer-events-none" />

                <CardHeader className="flex gap-4 items-start relative z-10 p-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">
                      {offer.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-1">
                      {offer.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 p-6 pt-2">
                  <div className="flex items-center justify-between border border-dashed border-muted/50 rounded-lg p-4 bg-background/50 backdrop-blur-md transition-colors duration-300">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">
                        Use Code
                      </p>
                      <p className="text-xl font-bold tracking-widest">
                        {offer.code}
                      </p>
                    </div>

                    {offer.code !== 'No code needed' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyCode(offer.code)}
                        className={`transition-transform hover:scale-110 ${
                          copiedCode === offer.code ? 'text-green-500' : ''
                        }`}
                        aria-label={`Copy code ${offer.code}`}
                      >
                        {copiedCode === offer.code ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="mt-12 text-sm sm:text-base text-muted-foreground text-center">
        ✨ Offers are updated monthly — check back often for new deals and
        seasonal perks!
      </p>
    </motion.section>
  );
}
