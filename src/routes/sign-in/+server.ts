import { authWithManagement } from "$lib/auth";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({ request, cookies } : RequestEvent) {
    console.log("sign-in POST request received on server.ts")
    const data = await request.json()
    console.log("data:", data)
    let result = await authWithManagement(data.username, data.password) as { success: boolean, token: string }
    if (result.success) {
        cookies.set("session", result.token, {
            path: "/",
            httpOnly: true,
            secure: true,
        })
    }
    return json({ success: result.success })
}   