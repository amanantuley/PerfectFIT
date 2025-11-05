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
import { Award } from 'lucide-react';
import { rewards } from '@/lib/rewards-data';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RewardsPage() {
  const { toast } = useToast();
  const [currentPoints, setCurrentPoints] = useState(250);
  const pointsToNextReward = 300; // next reward threshold
  const [displayPoints, setDisplayPoints] = useState(currentPoints);

  // ✨ Smooth counter animation for point updates
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
      description: `You've successfully redeemed "${title}". Keep earning more points!`,
    });
  };

  const progressPercent = Math.min((currentPoints / pointsToNextReward) * 100, 100);

  return (
    <motion.div
      className="space-y-12 animate-fade-in-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Reward Overview Card */}
      <Card className="shadow-lg border border-muted/40 backdrop-blur-md bg-background/70">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="mx-auto bg-primary/10 p-4 rounded-full mb-4"
          >
            <Award className="h-12 w-12 text-primary" />
          </motion.div>
          <CardTitle className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Your Rewards
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Thanks for being part of the PerfectFit community!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Your Points Balance</p>
            <motion.p
              key={displayPoints}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
            >
              {displayPoints}
            </motion.p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Next reward at {pointsToNextReward} points</span>
              <span>
                {pointsToNextReward - currentPoints > 0
                  ? `${pointsToNextReward - currentPoints} points to go`
                  : '🎊 New reward unlocked!'}
              </span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.7)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Available Rewards
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="flex flex-col text-center shadow-xl border border-muted/40 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 bg-background/60 backdrop-blur-md">
                <CardHeader className="items-center space-y-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <reward.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{reward.description}</p>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <p className="font-semibold text-lg text-primary">
                    {reward.points} Points
                  </p>
                  <Button
                    variant={currentPoints >= reward.points ? 'default' : 'secondary'}
                    disabled={currentPoints < reward.points}
                    className="w-full transition-all"
                    onClick={() => handleRedeem(reward.points, reward.title)}
                  >
                    {currentPoints >= reward.points ? 'Redeem' : 'Not enough points'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
