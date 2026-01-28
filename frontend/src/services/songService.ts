import { cookies } from 'next/headers';

import { type Song } from '../types/song';

export const getSongs = async (idType: 'actId' | 'setId', id: string): Promise<Song[]> => {
  // By default, doesn't have authorization because fetching from server and doesn't have client auth
  // We cannot include cookies in header with credentials: 'include', that only works from client side
  // So, we need to get cookie another way
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs?${idType}=${id}`, {
    headers: {
      // pass all cookies as key-value pair string separated by semicolons,
      //   just like the client side would
      'Cookie': cookieStore.toString()
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message}`);
  };

  const payload = await response.json();
  if (!payload || !payload.data) {
    console.error(payload);
    throw new Error(`Response unsuccessful: ${JSON.stringify(payload)}`);
  }

  return payload.data;
}

export const postSong = async (formData: FormData): Promise<boolean> => {
  const cookieStorage = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs`, {
    method: 'POST',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      actId: formData.get('actId'),
      setId: formData.get('setId'),
      title: formData.get('title'),
      description: formData.get('description'),
      genre: formData.get('genre'),
      tempo: formData.get('tempo')
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.status, error.message);
  }

  const payload = await response.json();
  if (!payload || !payload.success) {
    console.error(payload);
    throw new Error(`Response unsuccessful: ${JSON.stringify(payload)}`);
  }

  return payload.success;
}