import { cookies } from 'next/headers';

import { type Set } from '../types/set';

type PostSetPayload = {
  actId: string,
  title: string,
  description?: string
}

export const getSets = async (actId: string): Promise<Set[]> => {
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

export const deleteSet = async (setId: string): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets/${setId}`;

  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.message || `Failed to delete set: ${setId}`);
  }

  const payload = await response.json();
  if (!payload || !payload.success) {
    console.error(payload)
    throw new Error(`Response unsuccessful: ${JSON.stringify(payload)}`);
  }

  return payload.success;
}

export const promoteSet = async (setId: string): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/promoted-set`;
  const data = { setId: setId };

  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const payload = await response.json();
  if (!payload || !payload.success) throw new Error(`Response unsuccessful: ${payload.message}`);
  return payload.success;
}

export const postSet = async (data: PostSetPayload) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets`;
  const cookieStorage = await cookies();
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieStorage.toString()
    },
    body: JSON.stringify(data)
  });

  console.log("post data", data);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Response error:', response.status, errorData);
    throw new Error(`Response: ${response.status} - ${errorData.message || 'Unknown error'}`);
  }

  const result = await response.json();
  if (!result?.success) throw new Error("Post unsuccessful: ", { cause: result });
  return result.success;  // true
}