import { CustomLink } from './CustomLink';

import { Suspense } from 'react';

import { getSets } from '../services/setService';
import { type Set } from '../types/set';

import { SetPanel } from './SetPanel';

type Props = {
  sets?: Set[];
  actId: string;
  showCta?: boolean;
}

export const SetPanelsList = async ({ sets, actId, showCta }: Props) => {
  // if sets undefined, query them here given the actId
  // otherwise, they were passed directly from the Act from user tree data
  if (!sets) sets = await getSets(actId);
  if (sets.length === 0) return <p>No sets created yet. {showCta && <CustomLink href={`/act/${actId}`} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</CustomLink>}</p>;

  return (
    <Suspense fallback={<p>Loading Set...</p>}>
      <div className="flex flex-col gap-60">
        {sets.map((set: Set) => <SetPanel songs={set.songs} key={set.id} actId={actId} set={set} />)}
      </div>
    </Suspense>
  )
}