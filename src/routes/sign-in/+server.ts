import { json } from '@sveltejs/kit';
import crypto from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';
import { adminPassword } from '$lib/env';
export async function POST({ cookies, request } : RequestEvent) {
    const data = await request.json();
    if (data.password != adminPassword()) {
        return json({ success: false });
    }
    let expires = new Date(Date.now() + 86400 * 1000)
    const sessionData = {
      secret: adminPassword(),
      expires: expires
    };
  
    const iv = crypto.randomBytes(16);
    
    const key = crypto.createHash('sha256').update(adminPassword()).digest();
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(JSON.stringify(sessionData), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const encryptedValue = `${iv.toString('hex')}:${encrypted}`;
  
    cookies.set('session', encryptedValue, {
      path: '/',
      httpOnly: true,
      expires: expires,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400
    });
  
    return json({ success: true });
  }