import { config } from 'dotenv';
config();

import '@/ai/flows/sync-shopwave-data.ts';
import '@/ai/flows/suggest-similar-product-descriptions.ts';