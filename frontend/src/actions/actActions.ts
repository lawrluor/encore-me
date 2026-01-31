'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { addUserToAct, createAct, deleteAct } from '../lib/db/acts';
import { putAct } from '../services/actService';
import { getAuthUser } from '../services/authService';

export const deleteActAction = async (formData: FormData): Promise<void> => {
  if (!formData.get('id')) throw new Error('Act ID is required');
  const id = String(formData.get('id'));

  if (await deleteAct(id)) {
    // Since the Act is deleted, navigate away from it and refresh Acts data in home
    revalidatePath('/Act');
    revalidatePath('/Home');
    redirect('/Home');  // If act is deleted, route path will fail. Navigate away
  }

  // Stay on route if failed
}

export const postActAction = async (formData: FormData): Promise<void> => {
  const name = String(formData.get('name'));
  const description = formData.get('description') ? String(formData.get('description')) : '';
  const user = await getAuthUser();
  if (!user) throw new Error('Unauthorized');


  // Have to validate value in action
  // const validation = validateBody(actSchema, req.body);

  // if (!validation.valid) {
  //   return sendError(res, 'Validation failed', 400, validation.errors);
  // }

  // const { name, description } = validation.value;

  const act = await createAct(name, description);
  if (act) {
    await addUserToAct(user.id, act.id, 'creator');
    // revalidateTag(`user-${user.id}-tree`);
    revalidatePath('/Home');
    revalidatePath('/Act');
  }
}

export const putActAction = async (formData: FormData): Promise<void> => {
  if (!formData.get('id')) throw new Error('Act ID must not be blank');
  if (!formData.get('name')) throw new Error('Act name must not be blank');

  const id = String(formData.get('id'));
  const payload = {
    name: String(formData.get('name'))
  }

  await putAct(id, payload);
  revalidatePath('/Home');
  revalidatePath('/Act')
}


