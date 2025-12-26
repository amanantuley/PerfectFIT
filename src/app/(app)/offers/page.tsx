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
  Clock,
  TrendingDown,
  Heart,
  BadgeCheck,
  Filter,
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
    category: 'rental',
    savings: '25%',
    validUntil: 'Ongoing',
    badge: 'Popular',
  },
  {
    title: 'Suit Up for Less',
    description:
      'Buy any two suits and get the third one at 50% off. Tailored perfection made affordable.',
    code: 'SUITS50',
    icon: Tag,
    category: 'purchase',
    savings: '50%',
    validUntil: 'Dec 31',
    badge: 'Limited',
  },
  {
    title: 'Free Alterations',
    description:
      'All purchased garments come with one free alteration to ensure your perfect fit.',
    code: 'No code needed',
    icon: Sparkles,
    category: 'purchase',
    savings: 'Free',
    validUntil: 'Ongoing',
    badge: null,
  },
  {
    title: 'Seasonal Sale: Summer Styles',
    description:
      'Get up to 30% off on our lightweight summer collection — perfect for the season.',
    code: 'SUMMER30',
    icon: Tag,
    category: 'seasonal',
    savings: '30%',
    validUntil: 'Sep 30',
    badge: 'Seasonal',
  },
  {
    title: 'Bundle & Save: The Weekender',
    description:
      'Rent one suit and two shirts for a weekend getaway and save 20% on the total rental price.',
    code: 'WEEKEND20',
    icon: ShoppingBag,
    category: 'rental',
    savings: '20%',
    validUntil: 'Ongoing',
    badge: null,
  },
  {
    title: 'Student Discount',
    description:
      'Students get 15% off all year round. Just verify your ID once and enjoy exclusive perks.',
    code: 'STUDENT15',
    icon: Percent,
    category: 'exclusive',
    savings: '15%',
    validUntil: 'Ongoing',
    badge: 'Exclusive',
  },
];

export default function OffersPage() {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { key: null, label: 'All Offers', count: offers.length },
    { key: 'rental', label: 'Rental Deals', count: offers.filter(o => o.category === 'rental').length },
    { key: 'purchase', label: 'Purchase Offers', count: offers.filter(o => o.category === 'purchase').length },
    { key: 'seasonal', label: 'Seasonal', count: offers.filter(o => o.category === 'seasonal').length },
    { key: 'exclusive', label: 'Exclusive', count: offers.filter(o => o.category === 'exclusive').length },
  ];

  const filteredOffers = selectedCategory ? offers.filter(o => o.category === selectedCategory) : offers;
  
  const KPI_CARDS = [
    { icon: TrendingDown, label: 'Avg Savings', value: '27%', unit: 'off' },
    { icon: BadgeCheck, label: 'Active Offers', value: offers.length.toString(), unit: 'codes' },
    { icon: Clock, label: 'Updated', value: 'Monthly', unit: 'refreshed' },
    { icon: Heart, label: 'Most Popular', value: 'SUITS50', unit: 'code' },
  ];

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
      className="space-y-8 animate-fade-in-up"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-muted/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 sm:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
        <div className="relative space-y-4 max-w-3xl">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">Premium Offers Hub</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">Unlock exclusive deals crafted for your style. Limited-time offers, seasonal sales, and member-only perks designed to maximize your savings.</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">🏆 Up to 50% Off</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">⏰ Updated Monthly</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground">💎 Exclusive Member Perks</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.unit}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key as any)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                selectedCategory === cat.key
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-muted hover:border-primary/40 text-muted-foreground hover:bg-muted/40'
              }`}
            >
              {cat.label} <span className="ml-1 opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>
      {/* Offers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {filteredOffers.map((offer, index) => {
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
                  <div className="flex items-start justify-between w-full">
                    <div className="flex gap-3 items-start flex-1">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">
                          {offer.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1 line-clamp-2">
                          {offer.description}
                        </CardDescription>
                      </div>
                    </div>
                    {offer.badge && (
                      <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold whitespace-nowrap">{offer.badge}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 p-6 pt-2 space-y-4">
                  {/* Savings & Validity Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Savings</p>
                      <p className="text-lg font-bold text-primary">{offer.savings}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/40">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">Valid Until</p>
                      <p className="text-lg font-bold">{offer.validUntil}</p>
                    </div>
                  </div>

                  {/* Code Box */}
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
      <div className="border-t border-muted/40 py-6 px-6 sm:px-8 bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-lg">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p><strong>Monthly Updates:</strong> New offers and seasonal deals are added every month. Subscribe to notifications to never miss an exclusive offer.</p>
          </div>
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <BadgeCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p><strong>Verified Savings:</strong> All codes are verified and tested. Apply at checkout for instant discounts on your next order.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
