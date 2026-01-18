import { cookies } from 'next/headers';

import { CreateSongForm } from '../../components/CreateSongForm';
import { type Song } from '../../types/song'

type Props = {
  params: Promise<{ setId: string }>,
  searchParams: Promise<{ actId?: string }>
}

const EditSet = async ({ params, searchParams }: Props) => {
  // By default, doesn't have authorization because fetching from server and doesn't have client auth
  // We cannot include cookies in header with credentials: 'include', that only works from client side
  // So, we need to get cookie another way
  const cookieStore = await cookies();
  const { setId } = await params;
  const { actId } = await searchParams;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs?setId=${setId}`, {
    headers: {
      // pass all cookies as key-value pair string separated by semicolons,
      //   just like the client side would
      'Cookie': cookieStore.toString()
    }
  });
  if (!response.ok) { throw new Error(`${response.status}: ${JSON.stringify(await response.json())}`) };
  const result = await response.json();
  const songs = result.data;

  return <div>
    <h2>Recent Songs</h2>
    <CreateSongForm actId={actId} />

    <section>
      {songs && songs.length > 0
        ?
        songs.map((song: Song) => {
          return <div key={song.id}>
            <p>{song.title}</p>
            <p>{song.description}</p>
            <p>{song.tempo}</p>
          </div>
        })
        :
        <p>No songs in the set yet.</p>}
    </section>
  </div>
}

export default EditSet;