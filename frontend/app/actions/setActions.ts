'use server';

import { revalidatePath } from 'next/cache';

import { deleteSet, postSet, promoteSet } from '../services/setService';

export const deleteSetAction = async (setId: string): Promise<void> => {
  await deleteSet(setId);
  revalidatePath('/Act');
}

export const postSetAction = async (formData: formData): Promise<void> => {
  const data = {
    actId: String(formData.get('actId')),
    title: String(formData.get('title')),
    description: formData.get('description') ? String(formData.get('description')) : ''
  }

  await postSet(data);
  revalidatePath('/Act');
}

export const promoteSetAction = async (setId: string): Promise<void> => {
  await promoteSet(setId);
  revalidatePath('/Act');
}