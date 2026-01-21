import { cookies } from 'next/headers';

import { type Act } from '../types/act';

type ActFormPayload = {
  name: string;
  description?: string;
}

export const deleteAct = async (id: string): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts/${id}`;

  const cookieStorage = await cookies();
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const result = await response.json();
    console.error(result);
    throw new Error(result.message || 'Failed to delete act');
  }

  const payload = await response.json();
  if (!payload || !payload.success) {
    console.error(payload);
    throw new Error(`Response unsuccessful: ${JSON.stringify(payload)}`);
  }
  return payload.success;
}

export const getAct = async (id: string): Promise<Act> => {
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

export const putAct = async (id: string, payload: ActFormPayload): Promise<boolean> => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts/${id}`;
  const cookieStorage = await cookies();

  const response = await fetch(endpoint, {
    method: 'PUT',
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
    throw new Error(`Response unsuccessful: ${JSON.stringify(responsePayload)}`);
  }

  return responsePayload.success;
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
    throw new Error(`Response unsuccessful: ${JSON.stringify(responsePayload)}`);
  }

  return responsePayload.success;
}