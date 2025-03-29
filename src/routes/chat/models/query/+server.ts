import { validateSession } from "$lib/auth"
import { getAvailableModels, queryModel } from "$lib/models"
import { json, type RequestEvent } from "@sveltejs/kit"

export async function POST({ request, cookies }: RequestEvent) {
    try {
        let body = await request.json()
        let sessionToken = cookies.get("session")
        if (!sessionToken) {
            return json({ error: "No session token" }, { status: 401 })
        }
        if (!body.model || !body.message) {
            return json({ error: "Model and message are required" }, { status: 400 })
        }
        let response = await queryModel(sessionToken, body.model, body.message)
        return json({ response })
    }catch (error) {
        cookies.delete("session", { path: "/" })
        throw error
    }   
}   