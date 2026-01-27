import { cookies } from 'next/headers';

export const getUserTree = async (id: string) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/tree`;
  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const result = await response.json();
    console.error('Failed to fetch User tree:', result);
    return null;  // null for no data
  }

  // Assume data in correct format according to API definition
  const payload = await response.json();
  return payload.data;
}

