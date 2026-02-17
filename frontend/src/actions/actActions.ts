'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { addUserToAct, createAct, deleteAct, updateAct } from '../lib/db/acts';
import { validateBody, actSchema } from '../lib/utils/validation';
import { getAuthUser } from '../services/authService';

type ValidationError = {
  field: string;
  message: string;
}

export const deleteActAction = async (actId: string): Promise<void> => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error('Unauthorized');

  if (!actId) throw new Error('Act ID is required');

  if (await deleteAct(actId)) {
    // Since the Act is deleted, navigate away from it and refresh Acts data in home
    // revalidatePath('/act');
    revalidatePath('/home');
    redirect('/home');  // If act is deleted, route path will fail. Navigate away
  }

  // Stay on route if failed
}

export const postActAction = async (formData: FormData): Promise<void> => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error('Unauthorized');
  const user = auth.user;

  const formName = String(formData.get('name'));
  const formDescription = formData.get('description') ? String(formData.get('description')) : '';

  // Have to validate value in action
  const validation = validateBody(actSchema, { name: formName, description: formDescription });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { name, description } = validation.value;

  const act = await createAct(name, description);
  if (act) {
    await addUserToAct(user.id, act.id, 'creator');
    revalidatePath('/home');
    revalidatePath('/act');
    revalidatePath(`/act/${act.id}`);
    redirect(`/act/${act.id}`);  // redirect to new Act page
  }
}

export const putActAction = async (actId: string, formData: FormData): Promise<void> => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error('Unauthorized');

  const formName = formData.get('name') ? String(formData.get('name')) : "";
  const formDescription = formData.get('description') ? String(formData.get('description')) : "";

  const validation = validateBody(actSchema, { name: formName, description: formDescription });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { name, description } = validation.value;

  const updatedAct = await updateAct(actId, { name, description });
  if (updatedAct) {
    revalidatePath(`/act/${actId}`);
    redirect(`/act/${actId}`);
  }
}