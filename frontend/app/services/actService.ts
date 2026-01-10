export const deleteAct = async (actId: string) => {
  const token = localStorage.getItem('token');
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts/${actId}`;
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.message || `Failed to delete act: ${actId}`);
  }

  const result = await response.json();
  console.log(result);
  if (!result?.success) throw new Error('Unexpected format for server response');
  return result.success;
}