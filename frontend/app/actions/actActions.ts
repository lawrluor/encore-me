'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { deleteAct, getAct, getActs, postAct, putAct } from '../services/actService';
import { type Act } from '../types/act';

export const deleteActAction = async (formData: FormData): Promise<void> => {
  if (!formData.get('id')) throw new Error('Act ID is required');
  const id = String(formData.get('id'));
  await deleteAct(id);

  // Since the Act is deleted, navigate away from it and refresh Acts data in home
  revalidatePath('/');
  redirect('/');
}

export const getActAction = async (id: string): Promise<Act> => {
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

export const putActAction = async (formData: FormData): Promise<void> => {
  if (!formData.get('id')) throw new Error('Act ID must not be blank');
  if (!formData.get('name')) throw new Error('Act name must not be blank');
  
  const id = String(formData.get('id'));
  const payload = {
    name: String(formData.get('name'))
  }

  await putAct(id, payload);
  revalidatePath('/');
  revalidatePath('/Sets')
}


