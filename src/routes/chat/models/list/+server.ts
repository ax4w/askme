import { validateSession } from "$lib/auth"
import { getAvailableModels } from "$lib/models"
import { json, type RequestEvent } from "@sveltejs/kit"

export async function GET({ request, cookies }: RequestEvent) {
    try {
        let sessionToken = cookies.get("session")
        if (!sessionToken) {
            return json({ success: false, error: "No session token" }, { status: 401 })
        }
        let models = await getAvailableModels(sessionToken)
        return json({models})
    }catch (error) {
        cookies.delete("session", { path: "/" })
        throw error
    }
}   