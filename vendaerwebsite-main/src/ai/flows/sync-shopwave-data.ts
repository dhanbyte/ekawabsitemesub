'use server';
/**
 * @fileOverview An AI agent to sync data with Shopwave.
 *
 * - syncShopwaveData - A function that handles the data synchronization process.
 * - SyncShopwaveDataInput - The input type for the syncShopwaveData function.
 * - SyncShopwaveDataOutput - The return type for the syncShopwaveData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SyncShopwaveDataInputSchema = z.object({
  dataType: z.enum(['inventory', 'orders', 'customerData']).describe('The type of data to synchronize with Shopwave.'),
  shopwaveData: z.string().describe('The data from Shopwave in JSON format.'),
  vendorData: z.string().describe('The vendor data in JSON format.'),
});
export type SyncShopwaveDataInput = z.infer<typeof SyncShopwaveDataInputSchema>;

const SyncShopwaveDataOutputSchema = z.object({
  recommendations: z.string().describe('AI-powered recommendations for resolving sync discrepancies.'),
  updatedVendorData: z.string().describe('The updated vendor data in JSON format after synchronization.'),
});
export type SyncShopwaveDataOutput = z.infer<typeof SyncShopwaveDataOutputSchema>;

export async function syncShopwaveData(input: SyncShopwaveDataInput): Promise<SyncShopwaveDataOutput> {
  return syncShopwaveDataFlow(input);
}

const syncShopwaveDataPrompt = ai.definePrompt({
  name: 'syncShopwaveDataPrompt',
  input: {schema: SyncShopwaveDataInputSchema},
  output: {schema: SyncShopwaveDataOutputSchema},
  prompt: `You are an AI assistant helping vendors synchronize their data with Shopwave.

You will receive data from Shopwave and the vendor's current data. Your task is to analyze the data and provide recommendations for resolving any discrepancies.

Type of data: {{{dataType}}}
Shopwave Data: {{{shopwaveData}}}
Vendor Data: {{{vendorData}}}

Provide recommendations for resolving sync discrepancies and the updated vendor data after synchronization.

Ensure the output is a valid JSON object.
`,
});

const syncShopwaveDataFlow = ai.defineFlow(
  {
    name: 'syncShopwaveDataFlow',
    inputSchema: SyncShopwaveDataInputSchema,
    outputSchema: SyncShopwaveDataOutputSchema,
  },
  async input => {
    const {output} = await syncShopwaveDataPrompt(input);
    return output!;
  }
);
