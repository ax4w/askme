import { deepSeekApiKey, geminiApiKey, ollamaConnectionString } from './env';
import { allAvailableOllamaModels } from './ollama';

export interface Model {
    id: string;
    name: string;
}

export async function allAvailableModels(): Promise<Model[]> {
    let models: Model[] = [];
    if (deepSeekApiKey()) {
        models.push({
            id: 'deepseek-chat',
            name: 'DeepSeek Chat',
        });
        models.push({
            id: 'deepseek-reasoner',
            name: 'DeepSeek Reasoner',
        });
    }
    if (geminiApiKey()) {
        models.push({
            id: 'gemini-2.0-flash',
            name: 'Gemini 2.0 Flash',
        });
    }
    if (ollamaConnectionString()) {
        let ollamaModels = await allAvailableOllamaModels();
        ollamaModels.forEach(model => {
            models.push({
                id: model.id,
                name: model.name,
            });
        });
    }
    models.forEach(model => {
        console.log(model);
    });
    return models;
}