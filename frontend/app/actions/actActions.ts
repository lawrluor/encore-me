'use server';

import { revalidatePath } from 'next/cache';

import { postAct, getAct, getActs } from '../services/actService';
import { type Act } from '../types/act';

export const getActAction = async (id: string): Act => {
	const data = await getAct(id);
	return data;
}

export const getActsAction = async (): Promise<Act[]> => {
  return await getActs();
}

export const postActAction = async (formData: FormData): Promise<void> => {
  const payload = {
    name: String(formData.get('name')),
    description: formData.get('description') ? String(formData.get('description')) : ''
  }

  // server actions return null on success, so we don't need to check the result
  await postAct(payload);
  revalidatePath('/');
  revalidatePath('/Sets');
}