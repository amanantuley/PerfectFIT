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
import { Progress } from '@/components/ui/progress';
import { Award, Sparkles } from 'lucide-react';
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
        <CardHeader className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12 }}
            className="mx-auto bg-primary/10 p-4 rounded-full mb-4 shadow-sm"
          >
            <Award className="h-12 w-12 text-primary" />
          </motion.div>
          <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Your Rewards
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Track your progress and unlock exclusive perks.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10 max-w-2xl mx-auto">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Your Points Balance
            </p>
            <motion.p
              key={displayPoints}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
            >
              {displayPoints}
            </motion.p>
          </div>

          {/* 🏁 Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Next Reward: {pointsToNextReward} pts</span>
              <span>
                {isNextRewardUnlocked
                  ? '🎉 Reward Unlocked!'
                  : `${pointsToNextReward - currentPoints} pts remaining`}
              </span>
            </div>

            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🎁 Rewards Grid */}
      <section className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Available Rewards
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewards.map((reward, index) => {
            const canRedeem = currentPoints >= reward.points;
            return (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group"
              >
                <Card className="relative flex flex-col text-center shadow-md border border-muted/40 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 bg-background/60 backdrop-blur-lg rounded-2xl overflow-hidden">
                  {/* glow hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-sky-500/10 pointer-events-none" />

                  <CardHeader className="flex flex-col items-center space-y-3 py-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <reward.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-semibold text-lg">
                      {reward.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 flex-grow text-muted-foreground text-sm leading-relaxed">
                    {reward.description}
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 p-6 relative z-10">
                    <p className="font-semibold text-primary text-lg">
                      {reward.points} Points
                    </p>
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
                          <Sparkles className="mr-2 h-4 w-4" /> Redeem
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
