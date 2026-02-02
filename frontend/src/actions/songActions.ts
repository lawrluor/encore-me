'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { postSong } from '../services/songService';

// Wrapper for postSong to actually navigate after successful post
export const postSongAction = async (formData: FormData): Promise<void> => {
  await postSong(formData);

  // Because this is a server action, we can't call history.back(),
  //   there is no knowledge of client route history
  //   Instead, retrieve the URL we came from, and redirect back there
  const headersList = await headers();
  const referer = headersList.get('referer');
  if (referer) {
    revalidatePath(referer);
    redirect(referer)
  } else {
    redirect('/act');
  }
  // Let error bubble up
}