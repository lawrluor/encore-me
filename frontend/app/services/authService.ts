import { cookies } from 'next/headers';

export const getAuthUser = async () => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`;

  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    }
  })

  // handle expected and valid auth error
  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    const errorPayload = await response.json();
    console.error('Error in getAuthUser():', errorPayload);
    throw new Error(`getAuthUser response: ${response.status}`, { cause: errorPayload });
  }

  const result = await response.json();
  if (!result?.data) throw new Error(`Expected an object with field 'data', got ${JSON.stringify(result)}`);
  return result.data;
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
    const errorPayload = await response.json();
    console.error('Error in loginUser():', errorPayload);

    // only throw for unexpected errors, not for logic erros
    return null;
  }

  // 1. Extract the cookie from the Backend response
  const setCookieHeader = response.headers.get('set-cookie');

  // 2. Parse the cookie (Simple version)
  // The backend might send: "authToken=abc12345; Path=/; HttpOnly"
  // We need to parse this or simply set it blindly if the names match.

  // A robust way to forward it:
  const token = setCookieHeader?.split(';')[0]?.split('=')?.[1] || ''; // Very rough parsing

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
    const errorPayload = await response.json();
    console.error('Error in logoutUser():', errorPayload);
    throw new Error(errorPayload.message || `Logout failed: ${response.status}`, { cause: errorPayload });
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
    const errorPayload = await response.json();
    console.error('Error in signupUser():', errorPayload);
    throw new Error(errorPayload.message || `Signup failed: ${response.status}`, { cause: errorPayload });
  }

  const result = await response.json();
  if (!result) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);

  // 1. Extract the cookie from the Backend response
  const setCookieHeader = response.headers.get('set-cookie');

  // 2. Parse the cookie (Simple version)
  // The backend might send: "authToken=abc12345; Path=/; HttpOnly"
  // We need to parse this or simply set it blindly if the names match.

  // A robust way to forward it:
  const token = setCookieHeader?.split(';')[0]?.split('=')?.[1] || ''; // Very rough parsing

  // Match backend cookie name
  (await cookies()).set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // Add 'sameSite' and 'maxAge' later
  });
  return result;
}