import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { validateSession } from '$lib/auth';
import { deepSeek, gemini } from '$lib/clients';
import type OpenAI from 'openai';

async function queryModel(message: string, model: string, openAi: OpenAI) {    
    return await openAi.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant, who only answers in markdown." },
            { role: "user",  content: [{
                "type": "text",
                "text": message
            }], },
        ],
        model: model
    });
}

function getModel(model: string) {
    switch (model) {
        case 'deepseek-chat': case 'deepseek-reasoner':
            return deepSeek;
        case 'gemini-2.0-flash':
            return gemini;
        default:
            return deepSeek;
    }
}

export async function GET({ url, cookies }: RequestEvent) {
    await validateSession(cookies)  
    let message = url.searchParams.get('message');
    let model = url.searchParams.get('model');
    if (!message || !model) {
        return json({ error: 'Missing message or model' }, { status: 400 });
    }
    model = model.toLowerCase();
    const decodedMessage = message ? decodeURIComponent(message) : '';
    let openAi = getModel(model);
    const completion = await queryModel(decodedMessage, model, openAi);
    return json(
        {
            content: completion.choices[0].message.content,
            author: model,
            timestamp: new Date().toISOString(),
            model: model
        }
    );
}

