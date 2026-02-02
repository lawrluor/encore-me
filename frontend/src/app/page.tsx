import { redirect } from 'next/navigation';

import { getAuthUser } from '@/services/authService';

const Root = async () => {
  const user = await getAuthUser();
  if (!user) redirect('/login');
  else redirect('/home');
}

export default Root;
