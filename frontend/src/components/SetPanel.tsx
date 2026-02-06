import { CustomLink } from './CustomLink';
import { Rule } from './Rule';

import { Fragment } from 'react';

import { deleteSetAction, promoteSetAction, updateSetAction } from '../actions/setActions';
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

  return (
    <div className="p-20 bg-surface rounded-md">
      <header>
        <form action={updateSetAction.bind(null, set.id, actId)} className="flex justify-between">
          <div>
            <label htmlFor="title" className="sr-only">Title</label>
            <input type="text" id="title" name="title" defaultValue={set.title} className="block text-2xl" />

            {set.description && <>
              <label htmlFor="description" className="sr-only">Description</label>
              <input id="description" name="description" type="text" defaultValue={set.description} className="block text-foreground-muted" />
            </>}

            <input hidden type="submit" />
          </div>

          <div className="flex gap-5 items-start">
            <Button onClick={promoteSetAction.bind(null, set.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-diamond-plus-icon lucide-diamond-plus w-20 h-20"><path d="M12 8v8" /><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" /><path d="M8 12h8" /></svg></Button>
            <Button onClick={deleteSetAction.bind(null, set.id, actId)} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash w-20 h-20"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></Button>
          </div>
        </form>
      </header>

      <Rule className="my-20" />

      <section>
        {songs.length === 0
          ?
          <div className="col-span-3">
            <p>No songs have been added to this set yet. <CustomLink href={`/set/${set.id}`} className="inline underline text-accent cursor-pointer hover:opacity-60">Add songs</CustomLink>
            </p>
          </div>
          :
          <div>
            <div className="grid grid-cols-3 gap-10 mb-10">
              <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.SONG}</p></div>
              <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.GENRE}</p></div>
              <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.TEMPO}</p></div>


              {songs?.map((song: Song) => {
                return <Fragment key={song.id}>
                  <div className="flex items-center gap-10">
                    <div className="h-44 w-44 bg-gray-800 rounded-md shrink-0"></div>
                    <div className="shrink-0">
                      <p>{song.title}</p>
                      <p className="text-sm text-foreground-muted">{song.description}</p>
                    </div>
                  </div>

                  <div><p>{song.genre}</p></div>
                  <div><p>{song.tempo}</p></div>
                </Fragment>
              })}
            </div>

            <CustomLink href={`/set/${set.id}`} className="underline text-accent float-right text-sm cursor-pointer hover:opacity-60">add more songs</CustomLink>
          </div>}
      </section>
    </div>
  )
}