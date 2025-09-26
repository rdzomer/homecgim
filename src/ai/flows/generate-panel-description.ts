'use server';

/**
 * @fileOverview Generates a brief description of an HTML panel using AI.
 *
 * - generatePanelDescription - A function that generates the panel description.
 * - GeneratePanelDescriptionInput - The input type for the generatePanelDescription function.
 * - GeneratePanelDescriptionOutput - The return type for the generatePanelDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePanelDescriptionInputSchema = z.object({
  htmlContent: z
    .string()
    .describe('The HTML content of the panel.'),
});
export type GeneratePanelDescriptionInput = z.infer<
  typeof GeneratePanelDescriptionInputSchema
>;

const GeneratePanelDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A brief description of the HTML panel.'),
});
export type GeneratePanelDescriptionOutput = z.infer<
  typeof GeneratePanelDescriptionOutputSchema
>;

export async function generatePanelDescription(
  input: GeneratePanelDescriptionInput
): Promise<GeneratePanelDescriptionOutput> {
  return generatePanelDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePanelDescriptionPrompt',
  input: {schema: GeneratePanelDescriptionInputSchema},
  output: {schema: GeneratePanelDescriptionOutputSchema},
  prompt: `You are an expert at summarizing HTML content into brief, informative descriptions.

  Please analyze the following HTML content and create a concise description that captures its main purpose and key data points.

  HTML Content: {{{htmlContent}}}`,
});

const generatePanelDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePanelDescriptionFlow',
    inputSchema: GeneratePanelDescriptionInputSchema,
    outputSchema: GeneratePanelDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
