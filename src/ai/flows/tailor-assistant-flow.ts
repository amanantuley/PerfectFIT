'use server';
/**
 * @fileOverview An AI assistant for tailors to get design and fabric suggestions.
 *
 * - tailorAssistant - Generates suggestions for tailors.
 * - TailorAssistantInput - The input type for the function.
 * - TailorAssistantOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TailorAssistantInputSchema = z.object({
  garmentType: z.string().describe("The type of garment (e.g., 'suit', 'shirt', 'dress')."),
  occasion: z.string().describe("The occasion for the garment (e.g., 'wedding', 'business', 'casual')."),
  season: z.string().describe("The season the garment will be worn in (e.g., 'summer', 'winter')."),
  customerPreferences: z.string().describe("Any specific preferences from the customer (e.g., 'likes modern fit', 'prefers breathable fabrics')."),
});
export type TailorAssistantInput = z.infer<typeof TailorAssistantInputSchema>;


const TailorAssistantOutputSchema = z.object({
  fabricSuggestions: z.array(z.object({
      name: z.string().describe("The name of the fabric."),
      reasoning: z.string().describe("Why this fabric is a good choice.")
  })).describe("A list of 2-3 fabric suggestions."),
  designSuggestions: z.array(z.object({
      element: z.string().describe("The design element being suggested (e.g., 'Lapel Style', 'Fit')."),
      suggestion: z.string().describe("The specific suggestion for that element.")
  })).describe("A list of 2-3 design element suggestions."),
  customizationIdeas: z.array(z.string()).describe("A list of 2-3 unique customization ideas."),
});
export type TailorAssistantOutput = z.infer<typeof TailorAssistantOutputSchema>;

export async function tailorAssistant(input: TailorAssistantInput): Promise<TailorAssistantOutput> {
  return tailorAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorAssistantPrompt',
  input: { schema: TailorAssistantInputSchema },
  output: { schema: TailorAssistantOutputSchema },
  prompt: `You are an expert fashion designer and master tailor. A fellow tailor has asked for your advice on a new garment. Provide creative and practical suggestions based on the following customer requirements:

- Garment Type: {{garmentType}}
- Occasion: {{occasion}}
- Season: {{season}}
- Customer Preferences: "{{customerPreferences}}"

Based on this, provide the following in JSON format:

1.  **Fabric Suggestions**: Recommend 2-3 specific fabrics. For each, provide a brief reasoning explaining why it's suitable (e.g., "Linen for its breathability in summer").
2.  **Design Suggestions**: Suggest 2-3 key design elements (e.g., fit, lapel style for a suit, collar type for a shirt). Be specific.
3.  **Customization Ideas**: Offer 2-3 unique and appealing customization ideas that would elevate the garment (e.g., "Contrasting buttonhole stitching on the cuffs," "A subtle monogram on the collar").

Your response should be professional, inspiring, and helpful.
`,
});

const tailorAssistantFlow = ai.defineFlow(
  {
    name: 'tailorAssistantFlow',
    inputSchema: TailorAssistantInputSchema,
    outputSchema: TailorAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
