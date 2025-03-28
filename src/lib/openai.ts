import OpenAI from 'openai';
import { deepSeekApiKey, geminiApiKey } from './env';

export const deepSeek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepSeekApiKey()
});

export const gemini = new OpenAI({
    apiKey: geminiApiKey(),
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});