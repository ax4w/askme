import { managementConnectionString } from './env';
import { validateSession } from './auth';
import { goto } from '$app/navigation';
export type Model = {
    id: string
    name: string
}
export interface Message {
    content: string;
    author: string;
    model?: string;
}

export async function getAvailableModels(sessionToken: string) {
    let valid = await validateSession(sessionToken)
    if (!valid) {
        throw new Error("Invalid session")
    }
   console.log("sessionToken:", `${sessionToken}`)
    const response = await fetch(`http://${managementConnectionString()}/get-available-models`, {
        headers: {
            'Authorization': `${sessionToken}`,
        },
    })
    const data = await response.json()
    console.log("getAvailableModels data:")
    console.log(data)
    
    return data
}

export async function queryModel(sessionToken: string, model: string, message: string) {
    let valid = await validateSession(sessionToken)
    if (!valid) {
        throw new Error("Invalid session")
    }
    const response = await fetch(`http://${managementConnectionString()}/query-model`, {
        method: 'POST',
        headers: {
            'Authorization': `${sessionToken}`,
        },
        body: JSON.stringify({ model, message })
    })
    const data = await response.json()
    console.log("queryModel data:")
    console.log(data)
    return data
}