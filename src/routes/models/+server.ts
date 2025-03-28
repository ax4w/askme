import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { validateSession } from '$lib/auth';
import { allAvailableModels } from '$lib/models';

export async function GET({ cookies }: RequestEvent) {
    await validateSession(cookies)  
    return json([...await allAvailableModels()]);
}
