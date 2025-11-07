'use server';
/**
 * @file PerfectAI conversational assistant — Vercel + Next.js 15 safe version.
 * Uses lazy dynamic imports to avoid bundling Node-only modules like Handlebars.
 */

import { z } from 'zod'; // ✅ Use Zod directly — NOT from Genkit

// ✅ Define reusable schemas
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatWithPerfectAIInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatWithPerfectAIInput = z.infer<typeof ChatWithPerfectAIInputSchema>;

const ChatWithPerfectAIOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type ChatWithPerfectAIOutput = z.infer<typeof ChatWithPerfectAIOutputSchema>;

/**
 * Safely handles chat requests to the PerfectAI assistant.
 * Dynamically imports Genkit to avoid Webpack bundling issues on Vercel.
 */
export async function chatWithPerfectAI(
  input: ChatWithPerfectAIInput
): Promise<ChatWithPerfectAIOutput> {
  try {
    // ✅ Lazy import to prevent static evaluation during build
    const { ai } = await import('@/ai/genkit');

    // ✅ Define prompt once per runtime instance
    const prompt = ai.definePrompt({
      name: 'chatWithPerfectAIPrompt',
      input: { schema: ChatWithPerfectAIInputSchema },
      output: { schema: ChatWithPerfectAIOutputSchema },
      prompt: `
        You are PerfectAI — a friendly and professional AI assistant.
        Help users clearly and concisely on any topic.

        --- Conversation History ---
        {{#each history}}
        {{this.role}}: {{{this.content}}}
        {{/each}}

        --- User Message ---
        user: {{{message}}}

        Reply as the "model" in a helpful and natural way.
      `,
    });

    // ✅ Define and run the flow
    const flow = ai.defineFlow(
      {
        name: 'chatWithPerfectAIFlow',
        inputSchema: ChatWithPerfectAIInputSchema,
        outputSchema: ChatWithPerfectAIOutputSchema,
      },
      async (input) => {
        const { output } = await prompt(input);
        return output!;
      }
    );

    const result = await flow(input);
    return result;
  } catch (error: any) {
    console.error('⚠️ PerfectAI initialization failed:', error);
    return {
      response:
        'Sorry, PerfectAI is currently unavailable. Please try again later.',
    };
  }
}
