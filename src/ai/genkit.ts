import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit safely without crashing if the API key is missing.
// It will only fail when an AI generation is actually attempted.
export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY || 'MISSING_API_KEY' })],
  model: 'googleai/gemini-2.0-flash',
});
