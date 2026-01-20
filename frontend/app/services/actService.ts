type ActFormPayload = {
  name: string;
  description: string;
}

export const createAct = async (payload: ActFormPayload) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
  const response = await fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(`Response failed - ${response.status}: ${error.message}`);
  }

  const result = await response.json();
  if (!result.success) {
    console.error(result);
    throw new Error(`Response not successful.`);
  }

  return result;
}

// : Promise<object | Error>
export const deleteAct = async (actId: string) => {
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
  return result;
}