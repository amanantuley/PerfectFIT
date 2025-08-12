
'use server';

/**
 * @fileOverview Extracts body measurements from a full-body image using AI.
 *
 * - extractBodyMeasurements - A function that handles the body measurement extraction process.
 * - ExtractBodyMeasurementsInput - The input type for the extractBodyMeasurements function.
 * - ExtractBodyMeasurementsOutput - The return type for the extractBodyMeasurements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractBodyMeasurementsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A full-body image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractBodyMeasurementsInput = z.infer<typeof ExtractBodyMeasurementsInputSchema>;

const ExtractBodyMeasurementsOutputSchema = z.object({
  chest: z.number().describe('The chest measurement in centimeters (cm).'),
  waist: z.number().describe('The waist measurement in centimeters (cm).'),
  hip: z.number().describe('The hip measurement in centimeters (cm).'),
  shoulder: z.number().describe('The shoulder measurement in centimeters (cm).'),
  inseam: z.number().describe('The inseam measurement in centimeters (cm).'),
  sleeveLength: z.number().describe('The sleeve length in centimeters (cm).'),
  height: z.number().describe('The estimated total height of the person in centimeters (cm).'),
  weight: z.number().describe('The estimated weight of the person in kilograms (kg).'),
  neckSize: z.number().describe('The neck circumference in centimeters (cm).'),
  bodyShape: z.string().describe("The detected body shape of the person (e.g., 'Rectangle', 'Triangle', 'Inverted Triangle', 'Hourglass', 'Round')."),
});
export type ExtractBodyMeasurementsOutput = z.infer<typeof ExtractBodyMeasurementsOutputSchema>;

export async function extractBodyMeasurements(input: ExtractBodyMeasurementsInput): Promise<ExtractBodyMeasurementsOutput> {
  return extractBodyMeasurementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractBodyMeasurementsPrompt',
  input: {schema: ExtractBodyMeasurementsInputSchema},
  output: {schema: ExtractBodyMeasurementsOutputSchema},
  prompt: `You are an expert tailor with advanced experience in using computer vision for precise body measurements. Your task is to analyze the provided full-body image and extract accurate, tailor-ready measurements and determine the body shape.

  **Instructions:**
  1.  Carefully analyze the full-body image provided. Pay attention to the person's posture and the clarity of the image.
  2.  Extract the following measurements with the highest possible accuracy, providing them in the specified units.
  3.  Determine the person's body shape from one of the following options: 'Rectangle', 'Triangle', 'Inverted Triangle', 'Hourglass', 'Round'.
  4.  The output must be a JSON object containing realistic and consistent measurements suitable for creating custom-fit clothing.

  **Measurements to Extract:**
  - Chest (in cm)
  - Waist (in cm)
  - Hip (in cm)
  - Shoulder (in cm)
  - Inseam (in cm)
  - Sleeve Length (in cm)
  - Height (in cm)
  - Weight (in kg)
  - Neck Size (in cm)
  - Body Shape (e.g., 'Rectangle', 'Hourglass')

  **Image for Analysis:**
  {{media url=photoDataUri}}

  Provide only the JSON object as your output.
`,
});

const extractBodyMeasurementsFlow = ai.defineFlow(
  {
    name: 'extractBodyMeasurementsFlow',
    inputSchema: ExtractBodyMeasurementsInputSchema,
    outputSchema: ExtractBodyMeasurementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
