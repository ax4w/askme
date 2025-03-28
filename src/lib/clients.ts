import OpenAI from 'openai';

// Using process.env as fallback for Docker environment
const deepseekApiKey =  process.env.DEEPSEEK_API_KEY || 'dummy_key';
const geminiApiKey =  process.env.GEMINI_API_KEY || 'dummy_key';

export const deepSeek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepseekApiKey
});

export const gemini = new OpenAI({
    apiKey: geminiApiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});