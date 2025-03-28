import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { validateSession } from '$lib/auth';
import { pullOllamaModel } from '$lib/ollama';

export async function GET({ cookies }: RequestEvent) {
    await validateSession(cookies)  
    await pullOllamaModel("deepseek-r1:1.5b")
    return json({ message: 'Model pulled' });
}
