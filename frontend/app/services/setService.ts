export const deleteSet = async (setId: string): Promise<boolean | Error> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No authentication token found");

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets/${setId}`;
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse);
    throw new Error(errorResponse.message || `Failed to delete set: ${setId}`);
  }

  const result = await response.json();
  console.log(result);
  if (!result?.success) throw new Error(`Response unsuccessful: ${result.message}`);
  return result.success;  // true
}

export const promoteSet = async (setId: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Token not found");

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/promoted-set`;
  const data = { setId: setId };

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const result = await response.json();
  if (!result || !result.success) throw new Error(`Response unsuccessful: ${result.message}`);

  console.log(result);
  return result.success;
}