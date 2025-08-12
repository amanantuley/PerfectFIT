
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Percent, Sparkles, ShoppingBag, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const offers = [
  {
    title: 'First-Time Renter Discount',
    description: 'Get 25% off your first rental order. Perfect for trying out our service!',
    code: 'RENT25',
    icon: Percent,
  },
  {
    title: 'Suit Up for Less',
    description: 'Buy any two suits and get the third one at 50% off. Offer valid on our entire suit collection.',
    code: 'SUITS50',
    icon: Tag,
  },
  {
    title: 'Free Alterations',
    description: 'All purchased garments come with one free alteration to ensure the perfect fit, always.',
    code: 'No code needed',
    icon: Sparkles,
  },
  {
    title: 'Seasonal Sale: Summer Styles',
    description: 'Get up to 30% off on our summer collection, including linen shirts and lightweight suits.',
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
    description: 'Verified students get 15% off on all orders, all year round. Contact support to get verified.',
    code: 'STUDENT15',
    icon: Percent,
  },
];

export default function OffersPage() {
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    if (code === 'No code needed') return;
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code Copied!',
      description: `"${code}" has been copied to your clipboard.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Exclusive Offers</h1>
        <p className="text-lg text-muted-foreground">
          Take advantage of our special deals for a limited time.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <Card key={offer.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row gap-4 items-center">
                <offer.icon className="h-10 w-10 text-primary"/>
                <div>
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <div className="w-full text-center p-4 border-2 border-dashed rounded-lg bg-muted/50 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Use Code</p>
                        <p className="text-2xl font-bold tracking-widest">{offer.code}</p>
                    </div>
                    {offer.code !== 'No code needed' && (
                        <Button variant="ghost" size="icon" onClick={() => handleCopyCode(offer.code)}>
                            <Copy className="h-5 w-5" />
                            <span className="sr-only">Copy code</span>
                        </Button>
                    )}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
