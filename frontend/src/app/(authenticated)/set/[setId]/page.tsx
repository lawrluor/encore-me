import { CreateSongForm } from '@/components/CreateSongForm';
import { SongList } from '@/components/SongList';
import { getActById } from '@/lib/db/acts';
import { getSetById } from '@/lib/db/sets';
import { getSongs } from '@/services/songService';

type Props = {
  params: Promise<{ setId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// TODO: Make more efficient using denormalized queries? 
// Also, change songService to query db directly rather than make API calls
const SetPage = async ({ params }: Props) => {
  const { setId } = await params;
  const set = await getSetById(setId);
  if (!set) throw new Error("Set not found");

  const [setSongs, actSongs] = await Promise.all([
    getSongs('setId', setId),
    getSongs('actId', set.act_id)
  ]);

  const act = await getActById(set.act_id);

  return (
    <main className="flex flex-col gap-20 rounded-md bg-surface p-20">
      <CreateSongForm actId={act?.id} setId={setId} />

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
          <SongList initialSongs={actSongs.filter((actSong) => !setSongs.some((setSong) => setSong.id === actSong.id))} />
          :
          <p className="rounded-sm bg-surface-muted/40 p-12 text-sm text-foreground-muted">No songs for this act yet.</p>
        }
      </section>
    </main>
  )
}

export default SetPage;