import { cookies } from 'next/headers';

export const getSets = async (actId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets?actId=${actId}`;

    const cookieStorage = await cookies();

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Cookie': cookieStorage.toString(),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(errorBody);
      throw new Error(`${response.status}: ${errorBody.message}`);
    }

    const payload = await response.json();
    if (!payload || !payload.data) throw new Error(`Expected array of objects, got ${payload}`);
    return payload.data;
}