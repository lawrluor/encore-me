'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { addUserToAct, createAct, deleteAct, updateAct } from '../lib/db/acts';
import { validateBody, actSchema } from '../lib/utils/validation';
import { getAuthUser } from '../services/authService';

type ValidationError = {
  field: string;
  message: string
}

export const deleteActAction = async (formData: FormData): Promise<void> => {
  if (!formData.get('id')) throw new Error('Act ID is required');
  const id = String(formData.get('id'));

  if (await deleteAct(id)) {
    // Since the Act is deleted, navigate away from it and refresh Acts data in home
    // revalidatePath('/Act');
    revalidatePath('/Home');
    redirect('/Home');  // If act is deleted, route path will fail. Navigate away
  }

  // Stay on route if failed
}

export const postActAction = async (formData: FormData): Promise<void> => {
  const user = await getAuthUser();
  if (!user) throw new Error('Unauthorized');

  const formName = String(formData.get('name'));
  const formDescription = formData.get('description') ? String(formData.get('description')) : '';

  // Have to validate value in action
  const validation = validateBody(actSchema, { name: formName, description: formDescription });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { name, description } = validation.value;

  const act = await createAct(name, description);
  if (act) {
    await addUserToAct(user.id, act.id, 'creator');
    revalidatePath('/Home');
    redirect('/Home');
  }
}

export const putActAction = async (formData: FormData): Promise<void> => {
  const user = await getAuthUser();
  if (!user) throw new Error('Unauthorized');

  const id = String(formData.get('id'));
  if (!id) throw new Error('Act ID must not be blank');

  const formName = String(formData.get('name'));
  if (!formName) throw new Error('Act name must not be blank');

  const validation = validateBody(actSchema, { name: formName });
  if (!validation.valid) throw new Error(`Validation failed: ${validation.errors.map((e: ValidationError) => e.message).join(', ')}`);
  const { name, description } = validation.value;

  const updatedAct = await updateAct(id, { name, description });
  if (updatedAct) {
    // revalidatePath('/Home');
    // revalidatePath('/Act')
    revalidatePath(`/Act/${id}`);
    redirect(`/Act/${id}`);
  }
}


