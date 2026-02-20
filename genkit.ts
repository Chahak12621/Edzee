import { genkit, z } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/google-genai';

// 1. Initialize Genkit with the Google AI plugin
export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // Sets Gemini 1.5 Flash as the default model
});

// 2. Define your Chatbot Flow
// This is the function your frontend will call to talk to Gemini
export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.string(), // The user sends a string
    outputSchema: z.string(), // The AI returns a string
  },
  async (prompt) => {
    // Send the prompt to Gemini
    const { text } = await ai.generate(prompt);
    return text;
  }
);