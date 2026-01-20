import Link from 'next/link';
import { Fragment } from 'react';

import { deleteSetAction, promoteSetAction } from '../actions/setActions';
import { getSongsAction } from '../actions/songActions';
import { Button } from '../components/Button';
import { type Song } from '../types/song';

type Props = {
  actId: string;
  set: {
    id: string;
    title: string;
    description?: string;
  }
}

export const SetPanel = async ({ actId, set }: Props) => {
  const data = await getSongsAction('setId', set.id);

  const deleteSetWithId = deleteSetAction.bind(null, set.id);
  const promoteSetWithId = promoteSetAction.bind(null, set.id);
  // {/*{deleteErrorMessage && <p className="text-red-500">{deleteErrorMessage}</p>}
  // {promoteError && <p className="text-red-500">{promoteError.message}</p>}*/}
  return (
    <div className="gap-10 p-20 bg-gray-900 rounded-md">
      <header className="mb-30">
      <div className="flex justify-between">
        <Link className="hover:opacity-80" href={{ pathname: `/Sets/${set.id}`, query: { actId } }} draggable={false}><h2 className="text-bold text-2xl">{set.title}</h2></Link>
        <span>
          <Button callback={promoteSetWithId}>Promote</Button>
          <Button callback={deleteSetWithId} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></Button>
        </span>
      </div>

      {set.description && <p>Description: {set.description}</p>}
    </header>


      <main className="grid grid-cols-3 gap-10">
        <div><p className="opacity-60 text-xs">SONG</p></div>
        <div><p className="opacity-60 text-xs">GENRE</p></div>
        <div><p className="opacity-60 text-xs">TEMPO</p></div>

        {data?.map((song: Song) => {
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