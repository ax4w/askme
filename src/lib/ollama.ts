import type { Model } from "./models";
import { ollamaConnectionString } from './env';

export function allAvailableOllamaModels(): Promise<Model[]> {
    return fetch(`http://${ollamaConnectionString()}/api/tags`)
        .then(res => res.json())
        .then(data => {
            return data.models.map((model: any) => ({
                id: model.name,
                name: `${model.name} (Ollama)`,
            }));
        });
}

export function queryOllamaModel(model: string, message: string) {
    console.log(`http://${ollamaConnectionString()}/api/generate`);
    return fetch(`http://${ollamaConnectionString()}/api/generate`, {
        method: 'POST',
        body: JSON.stringify({ model, prompt: message, stream: false }),
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}