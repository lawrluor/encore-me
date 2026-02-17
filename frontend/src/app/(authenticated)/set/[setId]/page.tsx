import { CreateSongForm } from '@/components/CreateSongForm';
import { SongList } from '@/components/SongList';
import { getActById } from '@/lib/db/acts';
import { getSetById } from '@/lib/db/sets';
import { getSongs } from '@/services/songService';

type Props = {
  params: Promise<{ setId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SetPage = async ({ params, searchParams }: Props) => {
  const setIdPromise = params;
  const actIdPromise = searchParams;
  const promises = await Promise.all([setIdPromise, actIdPromise]);  // returns object with fields

  // narrow type to only allow string or undefined
  const setId = typeof promises[0].setId === "string" ? promises[0].setId : "";
  const actId = typeof promises[1].actId === "string" ? promises[1].actId : "";
  const actSongsPromise = getSongs('actId', actId);
  const setSongsPromise = getSongs('setId', setId);
  const setPromise = getSetById(setId);
  const actPromise = getActById(actId);

  const [actSongs, setSongs, set, act] = await Promise.all([actSongsPromise, setSongsPromise, setPromise, actPromise]);

  return (
    <main className="flex flex-col gap-20 rounded-md bg-surface p-20">
      <CreateSongForm actId={actId} setId={setId} />

      <section className="rounded-md bg-surface p-16 shadow-sm">
        <header className="mb-12">
          <p className="text-xs text-foreground-muted">SET</p>
          <h2 className="text-lg">{set?.title || 'Set'}</h2>
        </header>
        {setSongs && setSongs.length > 0
          ?
          <SongList initialSongs={setSongs} />
          :
          <p className="rounded-sm bg-surface-muted/40 p-12 text-sm text-foreground-muted">No songs in the set yet.</p>
        }
      </section>

      <section className="rounded-md bg-surface p-16 shadow-sm">
        <header className="mb-12">
          <h2 className="text-lg">Other Songs in {act?.title || 'Act'}</h2>
        </header>
        {actSongs && actSongs.length > 0
          ?
          <SongList initialSongs={actSongs} />
          :
          <p className="rounded-sm bg-surface-muted/40 p-12 text-sm text-foreground-muted">No songs for this act yet.</p>
        }
      </section>
    </main>
  )
}

export default SetPage;