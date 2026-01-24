import Link from 'next/link';
import { Suspense } from 'react';

import { getSets } from '../services/setService';
import { type Set } from '../types/set';

import { SetPanel } from './SetPanel';

type Props = {
  actId: string;
  showCta?: boolean;
}

export const SetPanelsList = async ({ actId, showCta }: Props) => {
  const data = await getSets(actId);

  if (data.length === 0) return <p>No sets created yet. {showCta && <Link href={`/Act/${actId}`} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</Link>}</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col gap-20">
        {data.map((set: Set) => <SetPanel key={set.id} actId={actId} set={set} />)}
      </div>
    </Suspense>
  )
}