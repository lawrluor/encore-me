export const getQR = async (text: string) => {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/qr?text=${text}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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

  console.log(result.data);
  return result.data;
}