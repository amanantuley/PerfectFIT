'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Percent, Sparkles, ShoppingBag, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';

const offers = [
  {
    title: 'First-Time Renter Discount',
    description: 'Get 25% off your first rental order — the perfect way to try our AI tailoring service.',
    code: 'RENT25',
    icon: Percent,
  },
  {
    title: 'Suit Up for Less',
    description: 'Buy any two suits and get the third one at 50% off. Tailored perfection made affordable.',
    code: 'SUITS50',
    icon: Tag,
  },
  {
    title: 'Free Alterations',
    description: 'All purchased garments come with one free alteration to ensure your perfect fit.',
    code: 'No code needed',
    icon: Sparkles,
  },
  {
    title: 'Seasonal Sale: Summer Styles',
    description: 'Get up to 30% off on our lightweight summer collection — perfect for the season.',
    code: 'SUMMER30',
    icon: Tag,
  },
  {
    title: 'Bundle & Save: The Weekender',
    description: 'Rent one suit and two shirts for a weekend getaway and save 20% on the total rental price.',
    code: 'WEEKEND20',
    icon: ShoppingBag,
  },
  {
    title: 'Student Discount',
    description: 'Students get 15% off all year round. Just verify your ID once and enjoy exclusive perks.',
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
      title: 'Code Copied!',
      description: `"${code}" has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10 animate-fade-in-up"
    >
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Exclusive Offers
        </h1>
        <p className="text-lg text-muted-foreground">
          Unlock premium deals, tailored for you — limited-time offers you’ll love.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => {
          const Icon = offer.icon;
          return (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="flex flex-col shadow-xl border border-muted/30 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 bg-background/70 backdrop-blur-md">
                <CardHeader className="flex-row gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow flex items-end">
                  <div className="w-full text-center p-4 border-2 border-dashed rounded-lg bg-muted/30 flex items-center justify-between backdrop-blur-sm">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Use Code</p>
                      <p className="text-xl font-bold tracking-widest">{offer.code}</p>
                    </div>

                    {offer.code !== 'No code needed' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyCode(offer.code)}
                        className={`transition-transform hover:scale-110 ${
                          copiedCode === offer.code ? 'text-green-500' : ''
                        }`}
                      >
                        <Copy className="h-5 w-5" />
                        <span className="sr-only">Copy code</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
