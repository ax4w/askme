import { error } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import crypto from 'crypto';
import { adminPassword } from './env';

export async function validateSession(cookies : Cookies) {
    const sessionCookie = cookies.get('session');

    if (!sessionCookie) {
        throw error(401, 'No session found');
    }

    try {
        const [ivHex, encryptedData] = sessionCookie.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        
        const key = crypto.createHash('sha256').update(adminPassword()).digest();
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        const sessionData = JSON.parse(decrypted);
        
        const now = new Date();
        const expires = new Date(sessionData.expires);
        
        if (expires < now || sessionData.secret !== adminPassword()) {
            cookies.delete('session', { path: '/' });
            throw error(401, 'No session found');
        }
        return true;
    } catch (err) {
        cookies.delete('session', { path: '/' });
        throw error(401, 'No session found');
    }
}
