import { CreateSongForm } from '@/components/CreateSongForm';
import { SongList } from '@/components/SongList';
import { getSongs } from '@/services/songService';

type Props = {
  params: Promise<{ setId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Set = async ({ params, searchParams }: Props) => {
  const setIdPromise = params;
  const actIdPromise = searchParams;
  const promises = await Promise.all([setIdPromise, actIdPromise]);  // returns object with fields

  // narrow type to only allow string or undefined
  const setId = typeof promises[0].setId === "string" ? promises[0].setId : "";
  const actId = typeof promises[1].actId === "string" ? promises[1].actId : "";
  const actSongsPromise = getSongs('actId', actId);
  const setSongsPromise = getSongs('setId', setId);

  const [actSongs, setSongs] = await Promise.all([actSongsPromise, setSongsPromise]);

  return (
    <main>
      <CreateSongForm actId={actId} setId={setId} />
      <p>Act: {actId}</p>
      <p>Set: {setId}</p>

      <section>
        <h2>Songs in Set</h2>
        {setSongs && setSongs.length > 0
          ?
          <SongList initialSongs={setSongs} />
          :
          <p>No songs in the set yet.</p>
        }
      </section>

      <section>
        <h2>Recent Songs</h2>
        {actSongs && actSongs.length > 0
          ?
          <SongList initialSongs={actSongs} />
          :
          <p>No songs for this act yet.</p>
        }
      </section>
    </main>
  )
}

export default Set;