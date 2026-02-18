import { jwtVerify, errors } from 'jose';
import { cookies } from 'next/headers';

import { safeParseJson } from '@/lib/utils/fetch';

type AuthUser = { id: string; email: string };

export type AuthResult =
  | { status: 'authenticated'; user: AuthUser }
  | { status: 'unauthenticated' }
  | { status: 'expired' };

export const getAuthUser = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) return { status: 'unauthenticated' };

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return {
      status: 'authenticated',
      user: {
        id: payload.userId as string,
        email: payload.email as string
      }
    };
  } catch (e) {
    if (e instanceof errors.JWTExpired) return { status: 'expired' };
    return { status: 'unauthenticated' };
  }
}

export const loginUser = async (data: { email: string, password: string }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorPayload = await safeParseJson(response);
    console.error('Error in loginUser():', errorPayload ?? `HTTP ${response.status}`);
    return null;
  }

  // 1. Extract the cookie from the Backend response
  const setCookieHeader = response.headers.get('set-cookie');

  // 2. Parse the cookie (Simple version)
  // The backend might send: "authToken=abc12345; Path=/; HttpOnly"
  // We need to parse this or simply set it blindly if the names match.

  // A robust way to forward it:
  const tokenPart = setCookieHeader?.split(';')[0] ?? '';
  const token = tokenPart.includes('=') ? tokenPart.substring(tokenPart.indexOf('=') + 1) : '';

  // BETTER WAY: Use the exact name your backend uses
  (await cookies()).set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // Add 'sameSite' and 'maxAge' based on your backend rules
  });

  const result = await response.json()
  if (!result) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);
  return result;
}

export const logoutUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    const errorPayload = await safeParseJson(response);
    console.error('Error in logoutUser():', errorPayload ?? `HTTP ${response.status}`);
    throw new Error(errorPayload?.message || `Logout failed: ${response.status}`, { cause: errorPayload });
  }

  const result = await response.json();
  if (!result) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);

  // Expire the cookie given from the server on client side, matching backend cookie name
  (await cookies()).set('authToken', '', {
    expires: new Date(0),
  });

  return result;
}

export const signupUser = async (payload: { name: string, email: string, password: string }) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorPayload = await safeParseJson(response);
    console.error('Error in signupUser():', errorPayload ?? `HTTP ${response.status}`);
    throw new Error(errorPayload?.message || `Signup failed: ${response.status}`, { cause: errorPayload });
  }

  const result = await response.json();
  if (!result) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);

  // 1. Extract the cookie from the Backend response
  const setCookieHeader = response.headers.get('set-cookie');

  // 2. Parse the cookie (Simple version)
  // The backend might send: "authToken=abc12345; Path=/; HttpOnly"
  // We need to parse this or simply set it blindly if the names match.

  // A robust way to forward it:
  const tokenPart = setCookieHeader?.split(';')[0] ?? '';
  const token = tokenPart.includes('=') ? tokenPart.substring(tokenPart.indexOf('=') + 1) : '';

  // Match backend cookie name
  (await cookies()).set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // Add 'sameSite' and 'maxAge' later
  });
  return result;
}