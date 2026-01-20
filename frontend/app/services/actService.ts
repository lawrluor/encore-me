import { cookies } from 'next/headers';

import { type Act } from '../types/act';

type ActFormPayload = {
  name: string;
  description?: string;
}

export const getAct = async (id: string): Act => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts/${id}`;

  const cookieStorage = await cookies();
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/JSON'
    }
  });

  if (!response.ok) {
    const errorPayload = await response.json();
    console.error(errorPayload);
    throw new Error(`${errorPayload.status}: ${errorPayload.message}`);
  }

  const payload = await response.json();
  if (!payload || !payload.data) {
    console.error(payload);
    throw new Error(`Unexpected payload: ${JSON.stringify(payload)}`)
  } 

  return payload.data;
}

export const getActs = async (): Promise<Act[]> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorPayload = await response.json();
    console.error(errorPayload);
    throw new Error(`Status: ${response.status}, ${errorPayload.message}`);
  }

  const payload = await response.json();
  if (!payload || !payload.data) throw new Error(`Unexpected payload format: ${JSON.stringify(payload)}`);
  return payload.data;
}

export const postAct = async (payload: ActFormPayload): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(`Response failed - ${response.status}: ${error.message}`);
  }

  const responsePayload = await response.json();
  if (!responsePayload || !responsePayload.success) {
    console.error(responsePayload);
    throw new Error(`Response unsuccessful: ${responsePayload}`);
  }

  return responsePayload.success;
}

export const deleteAct = async (actId: string): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts/${actId}`;
  const response = await fetch(endpoint, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const result = await response.json();
    console.error(result);
    throw new Error(result.message || 'Failed to delete act');
  }

  const result = await response.json();
  if (!result?.success) throw new Error('Unexpected format for server response');
  return result.success;
}