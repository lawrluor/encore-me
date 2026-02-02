'use server';

import { redirect } from 'next/navigation';

import { loginUser, logoutUser, signupUser } from '../services/authService';

export const loginUserAction = async (formData: FormData) => {
  const payload = {
    email: formData.get('email') ? String(formData.get('email')).trim() : '',
    password: formData.get('password') ? String(formData.get('password')).trim() : ''
  }

  const userData = await loginUser(payload);
  if (userData) redirect('/home');
}

export const logoutUserAction = async () => {
  const result = await logoutUser();
  if (result) redirect('/login');
}

export const signupUserAction = async (formData: FormData) => {
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  if (password !== passwordConfirm) return;

  const payload = {
    name: formData.get('name') ? String(formData.get('name')).trim() : '',
    email: formData.get('email') ? String(formData.get('email')).trim() : '',
    password: password ? String(password).trim() : '',
  }

  const userData = await signupUser(payload);
  if (userData) redirect('/home');
}