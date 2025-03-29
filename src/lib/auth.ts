import { managementConnectionString } from './env';

export async function authWithManagement(username: string, password: string) {
    console.log("managementConnectionString1:", `http://${managementConnectionString()}/login`)
    let response = await fetch(`http://${managementConnectionString()}/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })
    
    if (!response.ok) {
        console.log("Authentication failed, response:",response)
        return {success: false, token: ""};
    }
    let data = await response.json();
    return {success: data.success === "true", token: data.token};
}

export async function doesUserExist(username: string) {
    return await fetch(`http://${managementConnectionString()}/does-user-exist`, {
        method: 'POST',
        body: JSON.stringify({ username }),
    }).then(res => {
        if (!res.ok) {
            return false;
        }
        return res.json();
    }).then(data => {
        return data.exists;
    })
}

export async function validateSession(sessionToken: string) {
    let response = await fetch(`http://${managementConnectionString()}/auth`, {
        method: 'POST',
        headers: {
            'Authorization': `${sessionToken}`,
        },
    })

    if (!response.ok) {
        console.log("Authentication failed, response:",response)
        return false;
    }
    let data = await response.json();
    console.log("validateSession data:", data)
    return data.success;
}
