import Link from 'next/link';
import { Fragment } from 'react';

import { deleteSetAction, promoteSetAction } from '../actions/setActions';
import { Button } from '../components/Button';
import { getSongs } from '../services/songService';
import { type Song } from '../types/song';

type Props = {
  songs?: Song[];
  actId: string;
  set: {
    id: string;
    title: string;
    description?: string;
  }
}

const COLUMN_NAMES = {
  SONG: 'SONG',
  GENRE: 'GENRE',
  TEMPO: 'TEMPO'
} as const;

export const SetPanel = async ({ songs, actId, set }: Props) => {
  if (!songs) songs = await getSongs('setId', set.id);

  const deleteSetWithId = deleteSetAction.bind(null, set.id, actId);
  const promoteSetWithId = promoteSetAction.bind(null, set.id);

  return (
    <div className="gap-10 p-20 bg-gray-900 rounded-md">
      <header className="mb-30">
        <div className="flex justify-between">
          <Link className="hover:opacity-80" href={{ pathname: `/Set/${set.id}`, query: { actId } }} draggable={false}><h2 className="text-bold text-2xl">{set.title}</h2></Link>
          <span>
            <Button onClick={promoteSetWithId}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-diamond-plus-icon lucide-diamond-plus"><path d="M12 8v8" /><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" /><path d="M8 12h8" /></svg></Button>
            <Button onClick={deleteSetWithId} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></Button>
          </span>
        </div>

        {set.description && <p>Description: {set.description}</p>}
      </header>

      <main className="grid grid-cols-3 gap-10">
        <div><p className="opacity-60 text-xs">{COLUMN_NAMES.SONG}</p></div>
        <div><p className="opacity-60 text-xs">{COLUMN_NAMES.GENRE}</p></div>
        <div><p className="opacity-60 text-xs">{COLUMN_NAMES.TEMPO}</p></div>

        {songs.length === 0
          ?
          <div className="col-span-3">
            <p>No songs have been added to this set yet. <Link href={`/Set/${set.id}`} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Add songs</Link></p>
          </div>
          :
          songs?.map((song: Song) => {
            return <Fragment key={song.id}>
              <div className="flex items-center gap-10">
                <div className="h-44 w-44 bg-gray-800 rounded-md shrink-0"></div>
                <div className="shrink-0">
                  <p>{song.title}</p>
                  <p className="text-sm opacity-60">{song.description}</p>
                </div>
              </div>

              <div><p>{song.genre}</p></div>
              <div><p>{song.tempo}</p></div>
            </Fragment>
          })}
      </main>
    </div>
  )
}