import { revalidatePath } from 'next/cache';

import { postAct, getActs } from '../services/actService';
import { type Act } from '../types/act';

type ActFormPayload = {
  name: string;
  description?: string;
}

export const getActsAction = async (): Promise<Act[]> => {
  return await getActs();
}

export const postActAction = async ({ formData }: { formData: ActFormPayload }): Promise<boolean> => {
  const data = {
    name: formData.name,
    description: formData.description
  }

  // result SHOULD BE guaranteed to be true or would have thrown Error
  const result = await postAct(data);
  if (result) revalidatePath('/');
  return result;
}