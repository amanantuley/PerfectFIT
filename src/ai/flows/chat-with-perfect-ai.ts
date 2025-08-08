'use server';
/**
 * @fileOverview A general purpose conversational AI assistant.
 *
 * - chatWithPerfectAI - Handles the chat conversation.
 * - ChatWithPerfectAIInput - The input type for the chat function.
 * - ChatWithPerfectAIOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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


export async function chatWithPerfectAI(input: ChatWithPerfectAIInput): Promise<ChatWithPerfectAIOutput> {
  return chatWithPerfectAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithPerfectAIPrompt',
  input: {schema: ChatWithPerfectAIInputSchema},
  output: {schema: ChatWithPerfectAIOutputSchema},
  prompt: `You are PerfectAI, a friendly and helpful AI assistant. Your goal is to assist users with their questions on any topic. Be concise, friendly, and professional.

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
    const {output} = await prompt(input);
    return output!;
  }
);
