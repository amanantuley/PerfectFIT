'use server';
/**
 * @fileOverview A general purpose conversational AI assistant.
 */

import { z } from 'genkit'; // zod wrapper from genkit is fine to import
// ❌ Do not import `ai` here at the top
// import { ai } from '@/ai/genkit'; ❌

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

// ✅ FIXED: Lazy load Genkit AI runtime
export async function chatWithPerfectAI(
  input: ChatWithPerfectAIInput
): Promise<ChatWithPerfectAIOutput> {
  // Import `ai` dynamically to prevent Next.js from bundling handlebars
  const { ai } = await import('@/ai/genkit');

  // Define prompt + flow dynamically (safe for server runtime)
  const prompt = ai.definePrompt({
    name: 'chatWithPerfectAIPrompt',
    input: { schema: ChatWithPerfectAIInputSchema },
    output: { schema: ChatWithPerfectAIOutputSchema },
    prompt: `
      You are PerfectAI, a friendly and helpful AI assistant. Your goal is to assist users with their questions on any topic. Be concise, friendly, and professional.

      Here is the conversation history:
      {{#each history}}
      {{this.role}}: {{{this.content}}}
      {{/each}}

      Here is the new user message:
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

  // ✅ Execute at runtime only (no static bundling)
  return chatWithPerfectAIFlow(input);
}
