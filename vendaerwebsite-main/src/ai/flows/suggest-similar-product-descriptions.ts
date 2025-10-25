'use server';

/**
 * @fileOverview An AI agent that suggests similar product descriptions.
 *
 * - suggestSimilarProductDescriptions - A function that handles the product description suggestion process.
 * - SuggestSimilarProductDescriptionsInput - The input type for the suggestSimilarProductDescriptions function.
 * - SuggestSimilarProductDescriptionsOutput - The return type for the suggestSimilarProductDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarProductDescriptionsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The product description to find similar descriptions for.'),
});
export type SuggestSimilarProductDescriptionsInput = z.infer<typeof SuggestSimilarProductDescriptionsInputSchema>;

const SuggestSimilarProductDescriptionsOutputSchema = z.object({
  suggestedDescriptions: z
    .array(z.string())
    .describe('An array of suggested product descriptions.'),
});
export type SuggestSimilarProductDescriptionsOutput = z.infer<typeof SuggestSimilarProductDescriptionsOutputSchema>;

export async function suggestSimilarProductDescriptions(input: SuggestSimilarProductDescriptionsInput): Promise<SuggestSimilarProductDescriptionsOutput> {
  return suggestSimilarProductDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarProductDescriptionsPrompt',
  input: {schema: SuggestSimilarProductDescriptionsInputSchema},
  output: {schema: SuggestSimilarProductDescriptionsOutputSchema},
  prompt: `You are a helpful assistant that suggests similar product descriptions based on a given product description.

  Given the following product description, suggest 3 similar product descriptions:

  Product Description: {{{productDescription}}}

  Respond as a JSON array of strings.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const suggestSimilarProductDescriptionsFlow = ai.defineFlow(
  {
    name: 'suggestSimilarProductDescriptionsFlow',
    inputSchema: SuggestSimilarProductDescriptionsInputSchema,
    outputSchema: SuggestSimilarProductDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
