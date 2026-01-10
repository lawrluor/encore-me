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
