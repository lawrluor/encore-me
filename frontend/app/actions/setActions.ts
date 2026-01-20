'use server';

import { revalidatePath } from 'next/cache';

import { promoteSet, deleteSet } from '../services/setService';

export const promoteSetAction = async (setId: string) => {
  const result = await promoteSet(setId);
  revalidatePath('/Sets');
  return result;
}

export const deleteSetAction = async (setId: string) => {
  const result = await deleteSet(setId);
  revalidatePath('/Sets');
  return result;
}