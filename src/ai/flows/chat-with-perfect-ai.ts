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
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.warn("AI Chat Flow failed, using demo fallback response. Error:", error.message || error);
      
      // Generate a friendly mock response based on the user's query
      const msg = input.message.toLowerCase();
      let response = "I'm currently running in Demo Mode because a valid Gemini API Key is not configured. ";
      
      if (msg.includes('hello') || msg.includes('hi')) {
        response += "Hello there! I'm PerfectAI. Even in Demo Mode, I can help you with style advice. What kind of outfit are you looking for today?";
      } else if (msg.includes('shirt') || msg.includes('t-shirt')) {
        response += "For shirts, I recommend a tailored fit. A Classic White Oxford Shirt is a timeless choice that fits almost any body shape perfectly.";
      } else if (msg.includes('size') || msg.includes('measure')) {
        response += "To get your size, please go to the 'AI Measure' section on the dashboard, upload a full-body photo, and I'll estimate your exact measurements!";
      } else if (msg.includes('rent') || msg.includes('buy')) {
        response += "You can both buy and rent garments from our catalog. Renting is perfect for special events, while buying gets you a permanent addition to your wardrobe.";
      } else {
        response += `I received your message: "${input.message}". To enable full AI conversations, please add a valid \`GEMINI_API_KEY\` to your \`.env.local\` file!`;
      }
      
      return { response };
    }
  }
);
