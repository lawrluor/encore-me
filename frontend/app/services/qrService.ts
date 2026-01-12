export const getQR = async (text: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("Token not found");

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/qr?text=${encodeURIComponent(text)}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error)
    throw new Error(error.message || `Response failed: ${response.status}`);
  }

  const result = await response.json();
  if (!result?.success) {
    console.error(result);
    throw new Error(result.message || `Result unsuccessful`);
  }

  return result.data;
}