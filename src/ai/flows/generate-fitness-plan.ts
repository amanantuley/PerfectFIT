
'use server';
/**
 * @fileOverview Generates personalized fitness and diet plans.
 *
 * - generateFitnessPlan - Generates a plan based on user goals and measurements.
 * - GenerateFitnessPlanInput - The input type for the function.
 * - GenerateFitnessPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFitnessPlanInputSchema = z.object({
  goal: z.enum(['maintain', 'gain', 'loss']).describe("The user's primary fitness goal (maintain size, muscle gain, or weight loss)."),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe("The user's current fitness level."),
  dietaryPreferences: z.enum(['none', 'vegetarian', 'vegan']).describe("The user's dietary preferences."),
  measurements: z.object({
    chest: z.number().describe("User's chest measurement in centimeters (cm)."),
    waist: z.number().describe("User's waist measurement in centimeters (cm)."),
    hip: z.number().describe("User's hip measurement in centimeters (cm)."),
  }).describe("The user's latest body measurements."),
  weightLossGoal: z.number().optional().describe("The user's desired weight loss in kilograms (kg). Only applies if goal is 'loss'."),
  timeframe: z.number().optional().describe("The user's desired timeframe to achieve the weight loss in weeks. Only applies if goal is 'loss'."),
});
export type GenerateFitnessPlanInput = z.infer<typeof GenerateFitnessPlanInputSchema>;


const GenerateFitnessPlanOutputSchema = z.object({
  fitnessPlan: z.object({
    title: z.string().describe("A catchy title for the fitness plan."),
    weeklySplit: z.array(z.object({
      day: z.string().describe("The day of the week for the workout (e.g., 'Day 1: Monday')."),
      focus: z.string().describe("The main focus for the day's workout (e.g., 'Upper Body Strength')."),
      duration: z.string().describe("The estimated duration of the workout in minutes (e.g., '45-60 minutes')."),
      exercises: z.array(z.string()).describe("A list of 4-6 specific exercises for the day, including sets and reps (e.g., 'Bench Press: 3 sets of 8-10 reps').")
    })).describe("A 5-day weekly workout split."),
    cardioSuggestion: z.string().describe("A recommendation for cardiovascular exercise for the week."),
    notes: z.string().optional().describe("General tips or notes for the fitness plan, like warm-up or cool-down advice.")
  }).describe("The AI-generated fitness plan."),
  dietPlan: z.object({
    title: z.string().describe("A catchy title for the diet plan."),
    calorieTarget: z.number().describe("The estimated daily calorie target for the user's goal."),
    macronutrientSplit: z.object({
        protein: z.string().describe("Recommended daily protein intake in grams."),
        carbs: z.string().describe("Recommended daily carbohydrate intake in grams."),
        fats: z.string().describe("Recommended daily fat intake in grams."),
    }).describe("The recommended macronutrient split."),
    dailyPlan: z.object({
      breakfast: z.string().describe("A specific breakfast meal suggestion."),
      lunch: z.string().describe("A specific lunch meal suggestion."),
      dinner: z.string().describe("A specific dinner meal suggestion."),
      snacks: z.array(z.string()).describe("A list of 1-2 healthy snack ideas."),
    }).describe("A sample daily meal plan."),
    notes: z.string().optional().describe("General tips or notes for the diet plan, like hydration or meal prep advice."),
  }).describe("The AI-generated diet plan."),
});
export type GenerateFitnessPlanOutput = z.infer<typeof GenerateFitnessPlanOutputSchema>;

export async function generateFitnessPlan(input: GenerateFitnessPlanInput): Promise<GenerateFitnessPlanOutput> {
  return generateFitnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFitnessPlanPrompt',
  input: {schema: GenerateFitnessPlanInputSchema},
  output: {schema: GenerateFitnessPlanOutputSchema},
  prompt: `You are an expert personal trainer and nutritionist. Your task is to create a highly detailed and personalized fitness and diet plan for a user based on their goals, fitness level, dietary preferences, and measurements.

User's Goal: {{goal}}
Fitness Level: {{fitnessLevel}}
Dietary Preferences: {{dietaryPreferences}}
{{#if weightLossGoal}}
Desired Weight Loss: {{weightLossGoal}} kg
Timeframe: {{timeframe}} weeks
{{/if}}
User's Measurements (in cm):
- Chest: {{measurements.chest}}
- Waist: {{measurements.waist}}
- Hip: {{measurements.hip}}

Based on this information, generate the following:

1.  A Detailed Fitness Plan:
    - Create a 5-day weekly workout split appropriate for the user's fitness level.
    - For each workout day, provide a clear focus (e.g., "Upper Body Strength", "Leg Day & Core").
    - Specify an estimated duration for each workout (e.g., "45-60 minutes").
    - List 4-6 specific exercises for each day, including recommended sets and reps (e.g., "Squats: 3 sets of 10-12 reps").
    - Provide a specific weekly cardio suggestion (e.g., "3 sessions of 30-minute moderate-intensity cardio").
    - Include a short, encouraging title and optional notes.
    - If the goal is 'loss', tailor the intensity and exercise selection to be effective for fat burning within the given timeframe.

2.  A Scientific Diet Plan:
    - Create a sample one-day meal plan (breakfast, lunch, dinner) that aligns with the user's fitness goal and dietary preferences ({{dietaryPreferences}}).
    - Calculate and provide an estimated daily calorie target.
    - Calculate and provide a recommended macronutrient split (protein, carbs, fats in grams).
    - Suggest 1-2 healthy snack options.
    - Make the meal suggestions simple, practical, and aligned with the dietary preference.
    - If the goal is 'loss', ensure the diet plan is in a reasonable caloric deficit to meet the {{weightLossGoal}} kg target over {{timeframe}} weeks.
    - Include a short, encouraging title and optional notes.

Produce the output in the specified JSON format. Be creative and encouraging in your titles and notes.
`,
});


const generateFitnessPlanFlow = ai.defineFlow(
  {
    name: 'generateFitnessPlanFlow',
    inputSchema: GenerateFitnessPlanInputSchema,
    outputSchema: GenerateFitnessPlanOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.warn("AI Fitness Plan Flow failed, using demo fallback plan. Error:", error.message || error);
      
      // Proportional or goal-specific calorie target estimation
      let calorieTarget = 2000;
      if (input.goal === 'loss') calorieTarget = 1700;
      if (input.goal === 'gain') calorieTarget = 2500;
      
      const protein = input.goal === 'gain' ? "150g" : "130g";
      const carbs = input.goal === 'loss' ? "120g" : "200g";
      const fats = "70g";

      const dailyPlan = {
        breakfast: input.dietaryPreferences === 'vegan' ? "Oatmeal with almond milk, chia seeds, and berries" : "3 Scrambled Eggs with Avocado and Whole Wheat Toast",
        lunch: input.dietaryPreferences === 'vegan' ? "Quinoa salad with mixed vegetables and grilled tofu" : "Grilled Chicken Breast with Brown Rice and Broccoli",
        dinner: input.dietaryPreferences === 'vegan' ? "Lentil soup with sweet potato and steamed spinach" : "Baked Salmon with Quinoa and Asparagus",
        snacks: input.dietaryPreferences === 'vegan' ? ["Mixed nuts", "Rice cakes with peanut butter"] : ["Greek yogurt with almonds", "Protein shake"]
      };

      const weeklySplit = [
        { day: 'Day 1: Monday', focus: 'Upper Body Pull (Back & Biceps)', duration: '45-60 minutes', exercises: ['Lat Pulldown: 3 sets of 10 reps', 'Barbell Row: 3 sets of 8 reps', 'Dumbbell Bicep Curl: 3 sets of 12 reps', 'Face Pulls: 3 sets of 15 reps'] },
        { day: 'Day 2: Tuesday', focus: 'Lower Body Strength (Quads & Calves)', duration: '50-60 minutes', exercises: ['Barbell Squat: 4 sets of 8 reps', 'Leg Press: 3 sets of 12 reps', 'Dumbbell Lunge: 3 sets of 10 reps each leg', 'Calf Raises: 4 sets of 15 reps'] },
        { day: 'Day 3: Wednesday', focus: 'Active Recovery & Core', duration: '30-45 minutes', exercises: ['Plank: 3 sets of 60 seconds', 'Hanging Leg Raises: 3 sets of 12 reps', 'Russian Twists: 3 sets of 20 reps', 'Light Walking/Stretch'] },
        { day: 'Day 4: Thursday', focus: 'Upper Body Push (Chest, Shoulders & Triceps)', duration: '45-60 minutes', exercises: ['Dumbbell Bench Press: 4 sets of 10 reps', 'Overhead Press: 3 sets of 8 reps', 'Incline Dumbbell Fly: 3 sets of 12 reps', 'Tricep Pushdown: 3 sets of 12 reps'] },
        { day: 'Day 5: Friday', focus: 'Lower Body Posterior Chain (Hamstrings & Glutes)', duration: '50-60 minutes', exercises: ['Romanian Deadlift: 4 sets of 8 reps', 'Leg Curl: 3 sets of 12 reps', 'Hip Thrusts: 3 sets of 10 reps', 'Plank with Shoulder Taps: 3 sets of 12 reps'] }
      ];

      return {
        fitnessPlan: {
          title: `Demo Plan: ${input.goal.toUpperCase()} Fit Program`,
          weeklySplit,
          cardioSuggestion: '3 sessions of 30-minute moderate-intensity cardio (brisk walking or cycling)',
          notes: 'Running in Demo Mode. Make sure to warm up for 5-10 minutes before starting each workout and cool down/stretch afterwards.'
        },
        dietPlan: {
          title: `Demo Diet: Balanced nutrition for ${input.goal}`,
          calorieTarget,
          macronutrientSplit: { protein, carbs, fats },
          dailyPlan,
          notes: 'Running in Demo Mode. Keep hydrated by drinking at least 2.5 to 3 liters of water daily.'
        }
      };
    }
  }
);
