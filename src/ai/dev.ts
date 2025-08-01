'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/extract-body-measurements.ts';
import '@/ai/flows/recommend-garments.ts';
import '@/ai/flows/chat-with-perfect-ai.ts';
import '@/ai/flows/generate-fitness-plan.ts';
