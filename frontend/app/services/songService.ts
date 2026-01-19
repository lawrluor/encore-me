'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const postSong = async (formData: FormData) => {
  const cookieStorage = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs`, {
    method: 'POST',
    headers: {
      'Cookie': cookieStorage.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      actId: formData.get('actId'),
      setId: formData.get('setId'),
      title: formData.get('title'),
      description: formData.get('description'),
      genre: formData.get('genre'),
      tempo: formData.get('tempo')
    })
  });

  if (!response.ok) {
    let error = await response.json();
    console.error(error);
    throw new Error(error.status, error.message);
  }

  const result = await response.json();
  if (!result || !result.data) throw new Error("Result in unexpected format");
  return result.data;
}

// Wrapper for postSong to actually navigate after successful post
export const createSong = async (formData: FormData) => {
  try {
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
      redirect('/Sets');
    }
  } finally {

  }
  // Let error bubble up
}