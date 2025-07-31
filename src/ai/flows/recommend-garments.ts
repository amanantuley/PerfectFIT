'use server';
/**
 * @fileOverview Recommends garments based on body measurements.
 *
 * - recommendGarments - Recommends garments that fit the user's measurements.
 * - RecommendGarmentsInput - The input type for the recommendGarments function.
 * - RecommendGarmentsOutput - The return type for the recommendGarments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { garments } from '@/lib/garments';
import { type ExtractBodyMeasurementsOutput } from './extract-body-measurements';

export type RecommendGarmentsInput = ExtractBodyMeasurementsOutput;
const RecommendGarmentsInputSchema = z.object({
  chest: z.number(),
  waist: z.number(),
  hip: z.number(),
  shoulder: z.number(),
  inseam: z.number(),
  sleeveLength: z.number(),
});

const RecommendGarmentsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe("A list of recommended garment names from the provided list that would be a good fit for the user's measurements."),
});
export type RecommendGarmentsOutput = z.infer<typeof RecommendGarmentsOutputSchema>;

export async function recommendGarments(input: RecommendGarmentsInput): Promise<RecommendGarmentsOutput> {
  return recommendGarmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendGarmentsPrompt',
  input: { schema: z.object({
    measurements: RecommendGarmentsInputSchema,
    garmentList: z.string().describe("A JSON string of available garments with their names and types.")
  }) },
  output: { schema: RecommendGarmentsOutputSchema },
  prompt: `You are a personal stylist. Based on the user's body measurements, recommend which of the following garments would be a good fit.
Only recommend items from the list.

User Measurements (in inches):
- Chest: {{measurements.chest}}
- Waist: {{measurements.waist}}
- Hip: {{measurements.hip}}
- Shoulder: {{measurements.shoulder}}
- Inseam: {{measurements.inseam}}
- Sleeve Length: {{measurements.sleeveLength}}

Available Garments:
{{{garmentList}}}

Return a JSON object with a 'recommendations' key containing a list of the names of the recommended garments. If no garments are a good fit, return an empty list.
`,
});

const recommendGarmentsFlow = ai.defineFlow(
  {
    name: 'recommendGarmentsFlow',
    inputSchema: RecommendGarmentsInputSchema,
    outputSchema: RecommendGarmentsOutputSchema,
  },
  async (measurements) => {
    const garmentList = JSON.stringify(garments.map(g => ({ name: g.name, type: g.type })));
    const { output } = await prompt({ measurements, garmentList });
    return output!;
  }
);
