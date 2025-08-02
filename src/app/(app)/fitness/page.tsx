
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fitnessHistory } from '@/lib/fitness-data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line } from 'recharts';
import { PlusCircle, Dumbbell, Utensils, Target, Loader2, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { generateFitnessPlan, type GenerateFitnessPlanInput } from '@/ai/flows/generate-fitness-plan';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const chartConfig = {
  chest: { label: 'Chest (in)', color: 'hsl(var(--chart-1))' },
  waist: { label: 'Waist (in)', color: 'hsl(var(--chart-2))' },
  hip: { label: 'Hip (in)', color: 'hsl(var(--chart-3))' },
};

const goals = [
  { name: 'Weight Loss', value: 'loss' as const, description: "Generate a plan to help you shed pounds and get leaner." },
  { name: 'Muscle Gain', value: 'gain' as const, description: "Generate a plan to build strength and increase muscle mass." },
  { name: 'Maintain', value: 'maintain' as const, description: "Generate a plan to maintain your current physique and fitness level." },
]

export default function FitnessTrackingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [aiPlan, setAiPlan] = useState<any | null>(null);
  const [weightLossGoal, setWeightLossGoal] = useState<number>(10);
  const [timeframe, setTimeframe] = useState<number>(8);
  const [showLossInputs, setShowLossInputs] = useState<boolean>(false);

  const handleAddMeasurement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Measurement Added',
      description: 'Your new measurements have been saved.',
    });
    (e.target as HTMLFormElement).reset();
  };
  
  const handleGeneratePlan = async (goal: 'loss' | 'gain' | 'maintain') => {
    setIsLoading(goal);
    setAiPlan(null);

    if (goal === 'loss') {
        setShowLossInputs(true);
        setIsLoading(null); // Don't show loader yet, wait for final submit
        return;
    }

    await generatePlan({ goal });
  }

  const generatePlan = async (input: Partial<GenerateFitnessPlanInput>) => {
    setIsLoading(input.goal || 'loss');
    try {
        const latestMeasurements = fitnessHistory[fitnessHistory.length - 1];
        if (!latestMeasurements) {
            toast({
                variant: 'destructive',
                title: 'No Measurements Found',
                description: 'Please add at least one measurement entry to generate a plan.',
            });
            return;
        }

        const planInput: GenerateFitnessPlanInput = {
            goal: input.goal || 'loss',
            measurements: {
                chest: latestMeasurements.chest,
                waist: latestMeasurements.waist,
                hip: latestMeasurements.hip,
            },
            ...input
        };

        const plan = await generateFitnessPlan(planInput);
        setAiPlan(plan);
        toast({
            title: 'AI Plan Generated!',
            description: `Your new plan is ready.`
        });
    } catch(e) {
        console.error(e);
        toast({
            variant: 'destructive',
            title: 'Error Generating Plan',
            description: 'There was an issue creating your plan. Please try again.',
        });
    } finally {
        setIsLoading(null);
        setShowLossInputs(false);
    }
  }

  const handleLossSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePlan({ goal: 'loss', weightLossGoal, timeframe });
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Add New Measurement</CardTitle>
            <CardDescription>Manually log your measurements.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMeasurement} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (in)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 40.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (in)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 32.5"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip (in)</Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 38.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder (in)</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 18"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Measurement History</CardTitle>
            <CardDescription>Track your progress over time.</CardDescription>
          </CardHeader>
          <CardContent className="pr-0">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                data={fitnessHistory}
                margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}"`}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Line
                  dataKey="chest"
                  type="monotone"
                  stroke="var(--color-chest)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="waist"
                  type="monotone"
                  stroke="var(--color-waist)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="hip"
                  type="monotone"
                  stroke="var(--color-hip)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"><Target />Fitness Goals</CardTitle>
            <CardDescription>Select a goal to receive an AI-generated fitness and diet plan based on your latest measurements.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {goals.map(goal => (
                 <Card key={goal.value} className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-xl">{goal.name}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button className="w-full" onClick={() => handleGeneratePlan(goal.value)} disabled={!!isLoading}>
                            {isLoading === goal.value ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                            Generate Plan
                        </Button>
                    </CardFooter>
                </Card>
            ))}
          </CardContent>
        </Card>
        
        {showLossInputs && (
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Weight Loss Details</CardTitle>
                    <CardDescription>Help us tailor your weight loss plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLossSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="weightLossGoal">How much weight do you want to lose? (lbs)</Label>
                                <Input 
                                    id="weightLossGoal" 
                                    type="number" 
                                    value={weightLossGoal} 
                                    onChange={(e) => setWeightLossGoal(Number(e.target.value))}
                                    placeholder="e.g., 10"
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="timeframe">In how many weeks?</Label>
                                <Input 
                                    id="timeframe" 
                                    type="number" 
                                    value={timeframe} 
                                    onChange={(e) => setTimeframe(Number(e.target.value))} 
                                    placeholder="e.g., 8"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setShowLossInputs(false)}>Cancel</Button>
                             <Button type="submit" disabled={isLoading === 'loss'}>
                                {isLoading === 'loss' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                Get My Plan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        )}

        {isLoading && !aiPlan && (
            <div className="flex flex-col items-center justify-center text-center gap-2 h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your personalized plan...</p>
                <p className="text-sm text-muted-foreground">This may take a moment.</p>
            </div>
        )}

        {aiPlan && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"><Dumbbell /> AI-Suggested Fitness Plan</CardTitle>
                        <CardDescription>{aiPlan.fitnessPlan.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {aiPlan.fitnessPlan.weeklySplit.map((day: any, index: number) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="font-bold">{day.day}</span>
                                            <span className="text-sm text-muted-foreground">{day.focus}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                            {day.exercises.map((ex: string, i: number) => <li key={i}>{ex}</li>)}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {aiPlan.fitnessPlan.notes && <p className="mt-4 text-sm text-muted-foreground italic border-l-4 pl-3">{aiPlan.fitnessPlan.notes}</p>}
                    </CardContent>
                </Card>

                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"><Utensils /> AI-Suggested Diet Plan</CardTitle>
                        <CardDescription>{aiPlan.dietPlan.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <h4 className="font-semibold">Breakfast</h4>
                           <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.breakfast}</p>
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-semibold">Lunch</h4>
                           <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.lunch}</p>
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-semibold">Dinner</h4>
                           <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.dinner}</p>
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-semibold">Snacks</h4>
                           <ul className="list-disc pl-5 text-muted-foreground">
                            {aiPlan.dietPlan.dailyPlan.snacks.map((snack: string, i: number) => <li key={i}>{snack}</li>)}
                           </ul>
                        </div>
                         {aiPlan.dietPlan.notes && <p className="mt-4 text-sm text-muted-foreground italic border-l-4 pl-3">{aiPlan.dietPlan.notes}</p>}
                    </CardContent>
                </Card>
            </div>
        )}
      </div>
    </div>
  );
}
