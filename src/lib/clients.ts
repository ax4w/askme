import { DEEPSEEK_API_KEY, GEMINI_API_KEY } from '$env/static/private'
import OpenAI from 'openai';


export const deepSeek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: DEEPSEEK_API_KEY
});

export const gemini = new OpenAI({
    apiKey: GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});