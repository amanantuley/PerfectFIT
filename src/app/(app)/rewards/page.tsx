import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';
import { rewards } from '@/lib/rewards-data';

export default function RewardsPage() {
  const currentPoints = 250;
  const pointsToNextReward = 500;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-headline text-rainbow bg-size-200 animate-text-rainbow">Your Rewards</CardTitle>
          <CardDescription className="text-lg">
            Thank you for being a loyal customer!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your Points Balance</p>
            <p className="text-5xl font-bold">{currentPoints}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Next reward at {pointsToNextReward} points</span>
                <span>{pointsToNextReward - currentPoints} points to go</span>
            </div>
            <Progress value={(currentPoints / pointsToNextReward) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline text-center text-rainbow bg-size-200 animate-text-rainbow">Available Rewards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.title} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center">
                <div className="p-3 bg-muted rounded-full">
                  <reward.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{reward.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{reward.description}</p>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <p className="font-bold text-lg">{reward.points} Points</p>
                <Button variant="secondary" className="w-full" disabled={currentPoints < reward.points}>
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
