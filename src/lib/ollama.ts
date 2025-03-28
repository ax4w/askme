import type { Model } from "./models";
import { ollamaConnectionString } from './env';

export function allAvailableOllamaModels(): Promise<Model[]> {
    console.log(`http://${ollamaConnectionString()}/api/tags`);
    return fetch(`http://${ollamaConnectionString()}/api/tags`)
        .then(res => res.json())
        .then(data => {
            if (data.models.length === 0) {
                return [];
            }
            return data.models.map((model: any) => ({
                id: model.name,
                name: `${model.name} (Ollama)`,
            }));
        });
}

export function queryOllamaModel(model: string, message: string) {
    return fetch(`http://${ollamaConnectionString()}/api/generate`, {
        method: 'POST',
        body: JSON.stringify({ model, prompt: message, stream: false }),
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}

export async function pullOllamaModel(model: string) {
    console.log(`pulling ${model}`);
    return fetch(`http://${ollamaConnectionString()}/api/pull`, {
        method: 'POST',
        body: JSON.stringify({ model }),
    })
}