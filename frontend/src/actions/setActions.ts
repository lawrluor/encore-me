'use server';

import { revalidatePath } from 'next/cache';

import { deleteSet, createSet } from '../lib/db/sets';
import { validateBody, setSchema } from '../lib/utils/validation';
import { getAuthUser } from '../services/authService';
import { promoteSet } from '../services/setService';

type ValidationError = {
  field: string;
  message: string;
}

export const deleteSetAction = async (setId: string, actId?: string): Promise<void> => {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Unauthorized');

  const deletedSet = await deleteSet(setId);
  if (!deletedSet) throw new Error('Set not found');

  if (actId) revalidatePath(`/Act/${actId}`);  // ideally, revalidate exact act
  else revalidatePath('/Act');
}

export const postSetAction = async (formData: FormData): Promise<void> => {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Unauthorized');

  const formActId = String(formData.get('actId'));
  const formTitle = String(formData.get('title'));
  const formDescription = formData.get('description') ? String(formData.get('description')) : '';

  const validation = validateBody(setSchema, { actId: formActId, title: formTitle, description: formDescription });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { actId, title, description } = validation.value;

  if (await createSet(actId, title, description)) revalidatePath(`/Act/${actId}`);
}

export const promoteSetAction = async (setId: string): Promise<void> => {
  await promoteSet(setId);
  revalidatePath('/Act');
}