'use server';

import { revalidatePath } from 'next/cache';

import { promoteSet, deleteSet } from '../services/setService';

export const promoteSetAction = async (setId: string): Promise<void> => {
  await promoteSet(setId);
  revalidatePath('/Sets');
}

export const deleteSetAction = async (setId: string): Promise<void> => {
  await deleteSet(setId);
  revalidatePath('/Sets');
}