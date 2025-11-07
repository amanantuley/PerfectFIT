'use server';
/**
 * @fileOverview PerfectAI conversational assistant — Next.js 15 safe version.
 * This version dynamically loads Genkit to prevent Webpack bundling issues.
 */

import { z } from 'genkit';

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

// ✅ Safe server-only function
export async function chatWithPerfectAI(
  input: ChatWithPerfectAIInput
): Promise<ChatWithPerfectAIOutput> {
  try {
    // ✅ Lazy import to prevent static bundling of handlebars
    const { ai } = await import('@/ai/genkit');

    const prompt = ai.definePrompt({
      name: 'chatWithPerfectAIPrompt',
      input: { schema: ChatWithPerfectAIInputSchema },
      output: { schema: ChatWithPerfectAIOutputSchema },
      prompt: `
        You are PerfectAI, a friendly and helpful AI assistant. 
        Your goal is to assist users with their questions on any topic.
        Be concise, friendly, and professional.

        Conversation history:
        {{#each history}}
        {{this.role}}: {{{this.content}}}
        {{/each}}

        New user message:
        user: {{{message}}}

        Generate a helpful response as the model.
      `,
    });

    const chatWithPerfectAIFlow = ai.defineFlow(
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

    return chatWithPerfectAIFlow(input);
  } catch (error: any) {
    console.error('⚠️ PerfectAI initialization failed:', error);
    return {
      response:
        'Sorry, PerfectAI is currently unavailable. Please try again later.',
    };
  }
}
