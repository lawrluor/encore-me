'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { isUserMemberOfAct } from '../lib/db/acts';
import { getSetById } from '../lib/db/sets';
import { addSongToSet, createSong, deleteSong, updateSong } from '../lib/db/songs';
import { getAuthUser } from '../services/authService';

export const deleteSongAction = async (actId: string, songId: string) => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error("Login required.");
  const authUser = auth.user;

  // Validate that user has access to delete this song from the set
  const isMember = await isUserMemberOfAct(authUser.id, actId);
  if (!isMember) throw new Error('Forbidden: You must be a member of this act');

  // Note: This will delete ALL instances of the song, not just remove song from set
  // TODO: possibly, add a removeSongFromSet db function and manage differently
  await deleteSong(songId, authUser.id);

  // Redirect. If error thrown at any point, we stay on same page or are navigated to error boundary
  const headersList = await headers();
  const referer = headersList.get('referer');
  if (referer) {
    revalidatePath(referer);
    redirect(referer)
  } else {
    redirect('/act');
  }
}

export const postSongAction = async (actId: string, setId: string, formData: FormData): Promise<void> => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error('Unauthorized');
  const authUser = auth.user;

  // validate form fields
  const title = formData.get('title')?.toString().trim() ?? '';
  const description = formData.get('description')?.toString().trim() ?? '';
  const genre = formData.get('genre')?.toString().trim() ?? '';
  const tempo = formData.get('tempo')?.toString().trim() ?? '';

  if (!title) throw new Error('Title is required');

  // will possibly be updated if incorrect
  let finalActId = actId;

  if (setId) {
    const set = await getSetById(setId);
    if (!set) throw new Error('Set not found');

    const isMember = await isUserMemberOfAct(authUser.id, set.act_id);
    if (!isMember) throw new Error('Forbidden: You must be a member of the act that owns this set');

    finalActId = set.act_id;
  } else if (actId) {
    const isMember = await isUserMemberOfAct(authUser.id, actId);
    if (!isMember) throw new Error('Forbidden: You must be a member of this act');
  }

  // First, create the Song - it will exist as a Song of the Act that is unassigned to a Set
  const newSong = await createSong(authUser.id, finalActId || null, title, description, genre, tempo);
  if (!newSong) throw new Error('Song creation failed');

  if (setId) {
    await addSongToSet(setId, newSong.id);
  }

  // Because this is a server action, we can't call something like history.back(),
  //   there is no knowledge of client route history
  //   Instead, retrieve the URL we came from, and redirect back there
  const headersList = await headers();
  const referer = headersList.get('referer');
  if (referer) {
    revalidatePath(referer);
    redirect(referer)
  } else {
    redirect(`/act/${finalActId}`);
  }
}

export const updateSongAction = async (songId: string, formData: FormData): Promise<void> => {
  const auth = await getAuthUser();
  if (auth.status !== 'authenticated') throw new Error('Unauthorized');
  const authUser = auth.user;

  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();
  const genre = formData.get('genre')?.toString();
  const tempo = formData.get('tempo')?.toString();

  const updatedSong = await updateSong(songId, authUser.id, { title, description, genre, tempo });
  if (!updatedSong) throw new Error('Song not found');

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