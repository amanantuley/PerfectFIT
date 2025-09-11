
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
import { PlusCircle, Dumbbell, Utensils, Target, Loader2, Bot, Info, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { generateFitnessPlan, type GenerateFitnessPlanInput } from '@/ai/flows/generate-fitness-plan';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartConfig = {
  chest: { label: 'Chest (cm)', color: 'hsl(var(--chart-1))' },
  waist: { label: 'Waist (cm)', color: 'hsl(var(--chart-2))' },
  hip: { label: 'Hip (cm)', color: 'hsl(var(--chart-3))' },
};

export default function FitnessTrackingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<any | null>(null);
  
  // Form state
  const [goal, setGoal] = useState<'loss' | 'gain' | 'maintain'>('loss');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [dietaryPreferences, setDietaryPreferences] = useState<'none' | 'vegetarian' | 'vegan'>('none');
  const [weightLossGoal, setWeightLossGoal] = useState<number>(5);
  const [timeframe, setTimeframe] = useState<number>(8);
  

  const handleAddMeasurement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Measurement Added',
      description: 'Your new measurements have been saved.',
    });
    (e.target as HTMLFormElement).reset();
  };
  
  const handleGeneratePlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAiPlan(null);

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
            goal,
            fitnessLevel,
            dietaryPreferences,
            measurements: {
                chest: latestMeasurements.chest,
                waist: latestMeasurements.waist,
                hip: latestMeasurements.hip,
            },
        };

        if (goal === 'loss') {
            planInput.weightLossGoal = weightLossGoal;
            planInput.timeframe = timeframe;
        }

        const plan = await generateFitnessPlan(planInput);
        setAiPlan(plan);
        toast({
            title: 'AI Plan Generated!',
            description: `Your new personalized plan is ready.`
        });
    } catch(e) {
        console.error(e);
        toast({
            variant: 'destructive',
            title: 'Error Generating Plan',
            description: 'There was an issue creating your plan. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Add New Measurement</CardTitle>
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
                  <Label htmlFor="chest">Chest (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 102.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 82.5"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 98.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder (cm)</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 45"
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
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">Measurement History</CardTitle>
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
                  tickFormatter={(value) => `${value} cm`}
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
            <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow"><Target />AI Fitness Planner</CardTitle>
            <CardDescription>Fill in your details to receive a personalized fitness and diet plan based on your latest measurements.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGeneratePlan} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="goal">Primary Goal</Label>
                        <Select value={goal} onValueChange={(v) => setGoal(v as any)}>
                            <SelectTrigger id="goal"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="loss">Weight Loss</SelectItem>
                                <SelectItem value="gain">Muscle Gain</SelectItem>
                                <SelectItem value="maintain">Maintain</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fitnessLevel">Fitness Level</Label>
                        <Select value={fitnessLevel} onValueChange={(v) => setFitnessLevel(v as any)}>
                            <SelectTrigger id="fitnessLevel"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                        <Select value={dietaryPreferences} onValueChange={(v) => setDietaryPreferences(v as any)}>
                            <SelectTrigger id="dietaryPreferences"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {goal === 'loss' && (
                    <div className="grid sm:grid-cols-2 gap-6 p-4 border rounded-md bg-muted/30">
                        <div className="space-y-2">
                            <Label htmlFor="weightLossGoal">How much weight do you want to lose? (kg)</Label>
                            <Input 
                                id="weightLossGoal" 
                                type="number" 
                                value={weightLossGoal} 
                                onChange={(e) => setWeightLossGoal(Number(e.target.value))}
                                placeholder="e.g., 5"
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
                )}
                
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Generate My Personalized Plan
                </Button>
            </form>
          </CardContent>
        </Card>
        
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
                        <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow"><Dumbbell /> AI Fitness Plan</CardTitle>
                        <CardDescription>{aiPlan.fitnessPlan.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 p-3 rounded-md bg-muted/50">
                            <h4 className="font-semibold">Cardio Suggestion</h4>
                            <p className="text-sm text-muted-foreground">{aiPlan.fitnessPlan.cardioSuggestion}</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {aiPlan.fitnessPlan.weeklySplit.map((day: any, index: number) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="font-bold">{day.day}</span>
                                            <span className="text-sm text-muted-foreground">{day.focus} &bull; {day.duration}</span>
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
                        <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow"><Utensils /> AI Diet Plan</CardTitle>
                        <CardDescription>{aiPlan.dietPlan.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div className="p-3 rounded-md bg-muted/50">
                                <p className="text-sm text-muted-foreground">Calories</p>
                                <p className="text-lg font-bold">{aiPlan.dietPlan.calorieTarget} kcal</p>
                            </div>
                            <div className="p-3 rounded-md bg-muted/50">
                                <p className="text-sm text-muted-foreground">Protein</p>
                                <p className="text-lg font-bold">{aiPlan.dietPlan.macronutrientSplit.protein}</p>
                            </div>
                            <div className="p-3 rounded-md bg-muted/50">
                                <p className="text-sm text-muted-foreground">Carbs</p>
                                <p className="text-lg font-bold">{aiPlan.dietPlan.macronutrientSplit.carbs}</p>
                            </div>
                            <div className="p-3 rounded-md bg-muted/50">
                                <p className="text-sm text-muted-foreground">Fats</p>
                                <p className="text-lg font-bold">{aiPlan.dietPlan.macronutrientSplit.fats}</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-2">
                           <div>
                               <h4 className="font-semibold text-lg border-b pb-1 mb-1">Breakfast</h4>
                               <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.breakfast}</p>
                           </div>
                           <div>
                               <h4 className="font-semibold text-lg border-b pb-1 mb-1">Lunch</h4>
                               <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.lunch}</p>
                           </div>
                           <div>
                               <h4 className="font-semibold text-lg border-b pb-1 mb-1">Dinner</h4>
                               <p className="text-muted-foreground">{aiPlan.dietPlan.dailyPlan.dinner}</p>
                           </div>
                           <div>
                               <h4 className="font-semibold text-lg border-b pb-1 mb-1">Snacks</h4>
                               <ul className="list-disc pl-5 text-muted-foreground">
                                {aiPlan.dietPlan.dailyPlan.snacks.map((snack: string, i: number) => <li key={i}>{snack}</li>)}
                               </ul>
                           </div>
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
