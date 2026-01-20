import Link from 'next/link';
import { Suspense } from 'react';

import { getSets } from '../services/setService';

import { SetCard } from './SetCard';

type Props = {
  actId: string;
  showCta: boolean;
}

export const SetsList = async ({ actId, showCta }: Props) => {
  const data = await getSets(actId);

  if (data.length === 0) return <p>No sets created yet. {showCta && <Link href={{ pathname: 'Sets', query: { actId } }} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</Link>}</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {data.map((set) => <SetCard key={set.id} actId={actId} set={set} />)}
    </Suspense>
  )
}