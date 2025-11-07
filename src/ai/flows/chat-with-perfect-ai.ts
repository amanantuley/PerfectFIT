'use server';
import { z } from 'zod'; // ✅ NOT 'genkit'

export async function chatWithPerfectAI(input: any) {
  try {
    const { ai } = await import('@/ai/genkit'); // ✅ Lazy import
    const prompt = ai.definePrompt({
      name: 'chatWithPerfectAIPrompt',
      input: { schema: z.object({ message: z.string() }) },
      output: { schema: z.object({ response: z.string() }) },
      prompt: `You are PerfectAI. Respond clearly and politely to user messages.`,
    });

    const flow = ai.defineFlow(
      { name: 'chatWithPerfectAIFlow' },
      async (input) => (await prompt(input)).output!
    );

    return flow(input);
  } catch (e) {
    console.error('AI init failed:', e);
    return { response: 'PerfectAI is unavailable right now.' };
  }
}
