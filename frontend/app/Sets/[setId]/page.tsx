import { cookies } from 'next/headers';

import { CreateSongForm } from '../../components/CreateSongForm';
import { SongListClient } from '../../components/SongListClient';

type idType = 'setId' | 'actId';

type Props = {
  params: Promise<{ setId: string }>,
  searchParams: Promise<{ actId?: string }>
}

const fetchSongs = async (idType: idType, id: string) => {
  // By default, doesn't have authorization because fetching from server and doesn't have client auth
  // We cannot include cookies in header with credentials: 'include', that only works from client side
  // So, we need to get cookie another way
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs?${idType}=${id}`, {
    headers: {
      // pass all cookies as key-value pair string separated by semicolons,
      //   just like the client side would
      'Cookie': cookieStore.toString()
    }
  });
  if (!response.ok) { throw new Error(`${response.status}: ${JSON.stringify(await response.json())}`) };
  const result = await response.json();
  const songs = result.data;
  return songs;
}

const EditSet = async ({ params, searchParams }: Props) => {
  const { setId } = await params;
  const { actId } = await searchParams;

  const setSongs = await fetchSongs('setId', setId);
  const actSongs = await fetchSongs('actId', actId);

  return <div>
    <CreateSongForm actId={actId} setId={setId} />

    <section>
      <h2>Songs in Set</h2>
      {setSongs && setSongs.length > 0
        ?
        <SongListClient initialSongs={setSongs} />

        :
        <p>No songs in the set yet.</p>}
    </section>

    <section>
      <h2>Recent Songs</h2>
      {actSongs && actSongs.length > 0
        ?
        <SongListClient initialSongs={actSongs} />
        :
        <p>No songs in the set yet.</p>}
    </section>
  </div>
}

export default EditSet;