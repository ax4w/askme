export function deepSeekApiKey() {
    console.log("deepseek", process.env.DEEPSEEK_API_KEY);
    return process.env.DEEPSEEK_API_KEY || 'dummy_key';
}

export function geminiApiKey() {
    console.log("gemini", process.env.GEMINI_API_KEY);
    return process.env.GEMINI_API_KEY || 'dummy_key';
}

export function ollamaConnectionString() {
    console.log("ollama", process.env.OLLAMA_CONNECTION_STRING);
    return process.env.OLLAMA_CONNECTION_STRING || '';
}

export function adminPassword() {
    console.log("admin", process.env.ADMIN_PW);
    return process.env.ADMIN_PW || 'dummy_key';
}