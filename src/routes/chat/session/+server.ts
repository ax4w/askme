import { validateSession } from "$lib/auth"
import { json } from "@sveltejs/kit"
import type { RequestEvent } from "../$types"

export async function GET({ cookies }: RequestEvent) {
    let sessionToken = cookies.get("session")
    if (!sessionToken) {
        return json({ error: "No session token" }, { status: 401 })
    }
    let valid = await validateSession(sessionToken)
    if (!valid) {
        cookies.delete("session", { path: "/" })
    }
    return json({ success: valid })
}   