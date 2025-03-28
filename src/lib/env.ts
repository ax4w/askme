import { DEEPSEEK_API_KEY, GEMINI_API_KEY, OLLAMA_CONNECTION_STRING, ADMIN_PW } from '$env/static/private';

export function deepSeekApiKey() {
    return process.env.DEEPSEEK_API_KEY || DEEPSEEK_API_KEY || 'dummy_key';
}

export function geminiApiKey() {
    return process.env.GEMINI_API_KEY || GEMINI_API_KEY || 'dummy_key';
}

export function ollamaConnectionString() {
    return process.env.OLLAMA_CONNECTION_STRING || OLLAMA_CONNECTION_STRING || '';
}

export function adminPassword() {
    return process.env.ADMIN_PW || ADMIN_PW || 'dummy_key';
}