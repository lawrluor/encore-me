import { getSongsAction } from '../../actions/songActions';
import { CreateSongForm } from '../../components/CreateSongForm';
import { SongList } from '../../components/SongList';
import { TopNav } from '../../components/TopNav';

type Props = {
  params: Promise<{ setId: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

const EditSet = async ({ params, searchParams }: Props) => {
  const { setId } = await params;
  let { actId } = await searchParams;
  actId = typeof actId === "string" ? actId : undefined;  // narrow type to only allow string or undefined

  const setSongs = await getSongsAction('setId', setId);
  const actSongs = typeof actId === 'string' ? await getSongsAction('actId', actId) : [];

  return <div>
    <TopNav />

    <CreateSongForm actId={actId} setId={setId} />
    <p>Act: {actId}</p>
    <p>Set: {setId}</p>

    <section>
      <h2>Songs in Set</h2>
      {setSongs && setSongs.length > 0
        ?
        <SongList initialSongs={setSongs} />

        :
        <p>No songs in the set yet.</p>}
    </section>

    <section>
      <h2>Recent Songs</h2>
      {actSongs && actSongs.length > 0
        ?
        <SongList initialSongs={actSongs} />
        :
        <p>No songs for this act yet.</p>}
    </section>
  </div>
}

export default EditSet;