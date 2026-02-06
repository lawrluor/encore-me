import Form from 'next/form';
import { Fragment } from 'react';

import { deleteSetAction, promoteSetAction, updateSetAction, postSetAction } from '../actions/setActions';
import { Button } from '../components/Button';
import { getSongs } from '../services/songService';
import { type Song } from '../types/song';

import { CustomLink } from './CustomLink';
import { Rule } from './Rule';

type Props = {
  songs?: Song[];
  actId: string;
  set: {
    id: string;
    title: string;
    description?: string;
  };
  isCreateMode?: boolean;
}

const COLUMN_NAMES = {
  SONG: 'SONG',
  GENRE: 'GENRE',
  TEMPO: 'TEMPO'
} as const;

export const SetPanel = async ({ songs, actId, set, isCreateMode = false }: Props) => {
  const resolvedSongs = isCreateMode ? [] : (songs || await getSongs('setId', set.id));

  return (
    <div className={`p-20 bg-surface ${isCreateMode ? 'rounded-b-md' : 'rounded-md'}`}>
      <form>
        <header>
          <div className="flex justify-between">
            <div>
              <label htmlFor="title" className="sr-only">Title</label>
              <input type="text" id="title" name="title" defaultValue={set.title} placeholder="New Set Title" className="block text-2xl bg-transparent placeholder:text-foreground-muted/50" />

              <label htmlFor="description" className="sr-only">Description</label>
              <input id="description" name="description" type="text" defaultValue={set.description} placeholder="Add a description..." className="block text-foreground-muted bg-transparent w-full placeholder:text-foreground-muted/50" />

              {!isCreateMode && <Button type={"submit"} className="sr-only" formAction={updateSetAction.bind(null, set.id, actId)}>Update Set</Button>}
            </div>

            <div className="flex gap-5 items-start">
              {isCreateMode ? (
                <>
                  <Button type="submit" className="p-10 bg-accent text-surface rounded-md" formAction={postSetAction.bind(null, actId)}>
                  <div className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-save w-16 h-16">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                    <span>SAVE</span>
                  </div>
                </Button>
                  {/*<Button type={"submit"} formAction={postSetAction.bind(null, actId)}>Save</Button>*/}
                </>
              ) : (
                <>
                  <Button type={"submit"} formAction={promoteSetAction.bind(null, set.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-diamond-plus-icon lucide-diamond-plus w-20 h-20"><path d="M12 8v8" /><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" /><path d="M8 12h8" /></svg></Button>
                  <Button type={"submit"} formAction={deleteSetAction.bind(null, set.id, actId)} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash w-20 h-20"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></Button>
                </>
              )}
            </div>
          </div>
        </header>

        <Rule className="my-20" />

        <section>
          {isCreateMode ? (
            <div>
              {/* <div className="text-foreground-muted text-sm">
                Save this set to start adding songs.
              </div> */}

              {/*<Button type="submit" title="Save" className="p-10 bg-accent text-surface rounded-md">
                <div className="flex gap-5 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-save w-16 h-16">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                  <span>SAVE</span>
                </div>
              </Button>*/}
              {/* <p>No songs have been added to this set yet. <CustomLink href={`/set/${set.id}`} className="inline text-accent text-sm font-bold cursor-pointer hover:opacity-60">ADD SONGS</CustomLink></p> */}
            </div>
          ) : (
            <>
              {resolvedSongs.length === 0
                ?
                <div className="col-span-3">
                  <p>No songs have been added to this set yet. <CustomLink href={`/set/${set.id}`} className="inline text-accent text-sm font-bold cursor-pointer hover:opacity-60">ADD SONGS</CustomLink></p>
                </div>
                :
                <div>
                  <div className="grid grid-cols-3 gap-10 mb-10">
                    <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.SONG}</p></div>
                    <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.GENRE}</p></div>
                    <div><p className="text-foreground-muted text-xs">{COLUMN_NAMES.TEMPO}</p></div>


                    {resolvedSongs?.map((song: Song) => {
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

                  <CustomLink href={`/set/${set.id}`} className="text-accent font-bold float-right text-sm cursor-pointer hover:opacity-60">ADD SONGS</CustomLink>
                </div>}
            </>
          )}
        </section>
      </form>
    </div >
  )
}