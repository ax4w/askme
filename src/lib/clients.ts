import { DEEPSEEK_API_KEY, GEMINI_API_KEY } from '$env/static/private'
import OpenAI from 'openai';

// Using process.env as fallback for Docker environment
const deepseekApiKey = DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY || 'dummy_key';
const geminiApiKey = GEMINI_API_KEY || process.env.GEMINI_API_KEY || 'dummy_key';

export const deepSeek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepseekApiKey
});

export const gemini = new OpenAI({
    apiKey: geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});