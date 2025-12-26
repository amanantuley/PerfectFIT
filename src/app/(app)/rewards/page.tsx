'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  Sparkles,
  Gift,
  Trophy,
  TrendingUp,
  Coins,
  Clock3,
  ShieldCheck,
  Star,
  CheckCircle,
  Crown,
  ArrowRight,
} from 'lucide-react';
import { rewards } from '@/lib/rewards-data';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RewardsPage() {
  const { toast } = useToast();
  const [currentPoints, setCurrentPoints] = useState(250);
  const pointsToNextReward = 300;
  const [displayPoints, setDisplayPoints] = useState(currentPoints);

  // ✨ Smooth animated counter for point updates
  useEffect(() => {
    const duration = 800;
    const start = displayPoints;
    const end = currentPoints;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setDisplayPoints(Math.floor(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [currentPoints]);

  const handleRedeem = (points: number, title: string) => {
    if (points > currentPoints) return;
    setCurrentPoints((prev) => prev - points);
    toast({
      title: '🎉 Reward Redeemed!',
      description: `You successfully redeemed “${title}”. Keep earning points for more rewards!`,
    });
  };

  const progressPercent = Math.min((currentPoints / pointsToNextReward) * 100, 100);
  const isNextRewardUnlocked = currentPoints >= pointsToNextReward;

  const tiers = [
    { name: 'Silver', threshold: 0, perks: 'Free alterations, priority chat' },
    { name: 'Gold', threshold: 500, perks: 'Same-day tailoring slots, 2x points on fits' },
    { name: 'Platinum', threshold: 1000, perks: 'Concierge stylist, free express shipping' },
  ];

  const currentTierIndex = tiers.reduce((acc, tier, idx) => (currentPoints >= tier.threshold ? idx : acc), 0);
  const currentTier = tiers[currentTierIndex];
  const nextTier = tiers[currentTierIndex + 1];
  const tierProgress = nextTier
    ? Math.min(
        ((currentPoints - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100,
        100,
      )
    : 100;
  const pointsToNextTier = nextTier ? Math.max(nextTier.threshold - currentPoints, 0) : 0;

  const STATUS_CARDS = [
    {
      label: 'Active points',
      value: currentPoints.toLocaleString(),
      helper: 'Usable now',
      icon: Coins,
      tone: 'from-fuchsia-500/15 to-purple-500/15',
    },
    {
      label: 'Next reward',
      value: isNextRewardUnlocked ? 'Unlocked' : `${pointsToNextReward - currentPoints} pts left`,
      helper: '₹1 = 1 point',
      icon: Gift,
      tone: 'from-emerald-500/15 to-teal-500/15',
    },
    {
      label: 'Tier',
      value: currentTier.name,
      helper: nextTier ? `${pointsToNextTier} pts to ${nextTier.name}` : 'Top tier secured',
      icon: Trophy,
      tone: 'from-amber-500/15 to-orange-500/15',
    },
    {
      label: 'Velocity',
      value: '~180 pts/mo',
      helper: 'Based on last 30 days',
      icon: TrendingUp,
      tone: 'from-sky-500/15 to-indigo-500/15',
    },
  ];

  const EARNING_ACTIONS = [
    {
      title: 'Complete measurement profile',
      description: 'Upload measurements and fit preferences to unlock size guarantees.',
      points: 80,
      cta: 'Update profile',
    },
    {
      title: 'Invite a friend',
      description: 'Both of you earn when your friend places their first tailored order.',
      points: 120,
      cta: 'Share invite',
    },
    {
      title: 'Review a delivered order',
      description: 'Add photos and fit notes to speed up your next tailoring session.',
      points: 60,
      cta: 'Write review',
    },
    {
      title: 'Book a virtual fitting',
      description: 'Join a stylist for a 10-min precision fit check and earn bonus points.',
      points: 90,
      cta: 'Schedule now',
    },
  ];

  const TIMELINE = [
    { title: 'Return credited', meta: 'Dec 12 • Order #PF-9921', change: '+120 pts' },
    { title: 'Tailor session completed', meta: 'Dec 02 • Virtual fitting', change: '+90 pts' },
    { title: 'Offer redeemed', meta: 'Nov 21 • Diwali Savings', change: '-200 pts' },
    { title: 'Order delivered', meta: 'Nov 14 • Suit set', change: '+260 pts' },
  ];

  const handleQuickEarn = (points: number, label: string) => {
    setCurrentPoints((prev) => prev + points);
    toast({
      title: 'Points added',
      description: `${points} pts added for ${label}. Keep the momentum going!`,
    });
  };

  return (
    <motion.div
      className="space-y-12 animate-fade-in-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🌟 Overview Section */}
      <Card className="shadow-xl border border-muted/30 bg-background/70 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-sky-500/10 pointer-events-none" />
        <CardHeader className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/30">
                <ShieldCheck className="h-4 w-4" /> PerfectFit Rewards
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Crown className="h-4 w-4" /> {currentTier.name} tier
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-4 w-4 text-primary" />
              Better fits earn faster points
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Live balance</p>
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
                >
                  {displayPoints}
                </motion.div>
                <Badge className="gap-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg">
                  <CheckCircle className="h-4 w-4" /> Redeemable now
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">1 point = ₹1 store value</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-muted-foreground">Next reward at {pointsToNextReward} pts</p>
              <p className="text-sm font-semibold text-primary">
                {isNextRewardUnlocked ? 'Unlocked — grab it now!' : `${pointsToNextReward - currentPoints} pts remaining`}
              </p>
              <Button size="sm" className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90" onClick={() => handleQuickEarn(50, 'quick bonus')}>
                Boost +50 pts
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Tier progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentTier.name} → {nextTier ? nextTier.name : 'Maxed'}</span>
              <span>{nextTier ? `${pointsToNextTier} pts to upgrade` : 'You are at the top tier'}</span>
            </div>
            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${tierProgress}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Perks: {currentTier.perks}</p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUS_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.label} className="border border-muted/40 bg-background/60 backdrop-blur-sm shadow-md">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.label}</p>
                      <p className="text-2xl font-bold text-foreground">{card.value}</p>
                      <p className="text-xs text-muted-foreground">{card.helper}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${card.tone}`}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progress to next reward */}
          <div className="rounded-xl border border-muted/30 bg-background/60 p-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Next reward unlocks at {pointsToNextReward} pts
              </p>
              <p className="text-xs text-muted-foreground">
                Earn faster via virtual fittings and reviews. Average unlock time: ~10 days at your pace.
              </p>
            </div>
            <div className="flex-1 sm:max-w-xs">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progressPercent.toFixed(0)}%</span>
              </div>
              <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earn More + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border border-muted/40 bg-background/70 backdrop-blur-sm shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-xl">Earn more points</CardTitle>
              <CardDescription>Stack quick wins to hit your next tier faster.</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 bg-primary/5 border-primary/30">
              <Sparkles className="h-4 w-4" /> Avg +350 pts/wk members
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {EARNING_ACTIONS.map((action) => (
              <Card key={action.title} className="border border-muted/40 bg-background/70 shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{action.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow">+{action.points}</Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleQuickEarn(action.points, action.title)}
                  >
                    {action.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-muted/40 bg-background/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Recent activity</CardTitle>
            <CardDescription>Transparent ledger of point movements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {TIMELINE.map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-3 border border-muted/30 rounded-lg p-3">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" /> {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
                <Badge variant="outline" className="bg-primary/5 border-primary/30 text-primary">{item.change}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 🎁 Rewards Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Available Rewards
            </h2>
            <p className="text-sm text-muted-foreground">Tailored perks for styling, alterations, and loyalty bonuses.</p>
          </div>
          <Badge variant="outline" className="gap-1 bg-primary/5 border-primary/30">
            <ShieldCheck className="h-4 w-4" /> Instant digital vouchers
          </Badge>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, index) => {
            const canRedeem = currentPoints >= reward.points;
            return (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="relative flex flex-col shadow-md border border-muted/40 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 bg-background/60 backdrop-blur-lg rounded-2xl overflow-hidden h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-sky-500/10 pointer-events-none" />

                  <CardHeader className="flex flex-col space-y-3 py-6">
                    <div className="p-3 bg-primary/10 rounded-full w-max">
                      <reward.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="font-semibold text-lg">{reward.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{reward.description}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 pb-0 text-sm text-muted-foreground leading-relaxed space-y-2">
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Star className="h-4 w-4" /> Premium loyalty perk
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 p-6 relative z-10 mt-auto">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-semibold text-primary text-lg">{reward.points} Points</p>
                      <Badge variant="outline" className="bg-primary/5 border-primary/30">Digital</Badge>
                    </div>
                    <Button
                      onClick={() => handleRedeem(reward.points, reward.title)}
                      variant={canRedeem ? 'default' : 'secondary'}
                      disabled={!canRedeem}
                      className={`w-full transition-all duration-300 ${
                        canRedeem
                          ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90'
                          : 'opacity-70'
                      }`}
                    >
                      {canRedeem ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" /> Redeem now
                        </>
                      ) : (
                        'Not enough points'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
