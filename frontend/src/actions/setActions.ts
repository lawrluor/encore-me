'use server';

import { revalidatePath } from 'next/cache';

import { checkUserSetAccess, createSet, deleteSet, getSetById, updateSet } from '../lib/db/sets';
import { updatePromotedSet } from '../lib/db/users';
import { validateBody, setSchema } from '../lib/utils/validation';
import { getAuthUser } from '../services/authService';

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
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Unauthorized');

  if (!setId) throw new Error('Set ID is required');

  // Verify the set exists
  const set = await getSetById(setId);
  if (!set) throw new Error('Set not found');

  const hasAccess = await checkUserSetAccess(authUser.id, setId);
  if (!hasAccess) throw new Error('You do not have access to this set');

  if (await updatePromotedSet(authUser.id, setId)) {
    revalidatePath('/Home');
  }
}

export const updateSetAction = async (setId: string, actId: string, formData: FormData): Promise<void> => {
  const authUser = await getAuthUser();
  if (!authUser) throw new Error('Unauthorized');

  // extract form data
  const formTitle = formData.get('title') ? String(formData.get('title')) : "";
  const formDescription = formData.get('description') ? String(formData.get('description')) : "";

  // validate form data
  const validation = validateBody(setSchema, { actId: actId, title: formTitle, description: formDescription });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { title, description } = validation.value;

  // call db
  const updatedSet = await updateSet(setId, { title, description });
  if (!updatedSet) throw new Error('Set not found');

  // revalidate
  revalidatePath(`/Act/${actId}`);
  revalidatePath(`/Set/${setId}`);
}