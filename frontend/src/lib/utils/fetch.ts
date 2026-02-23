export const safeParseJson = async <T = { message?: string }>(
  response: Response
): Promise<T | null> => {
  try {
    return await response.json() as T;
  } catch {
    return null;
  }
};
