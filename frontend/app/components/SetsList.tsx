import Link from 'next/link';

import { useGetSets } from '../hooks/useGetSets';

import { SetCard } from './SetCard';

type Props = {
  actId: string,
  showCta: boolean
}

export const SetsList = ({ actId, showCta }: Props) => {
  const { data, loading, errorMessage } = useGetSets({ actId });

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (data.length === 0) return <p>No sets created yet. {showCta && <Link href={{ pathname: 'Sets', query: { actId } }} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</Link>}</p>;

  return data.map((set) => <SetCard key={set.id} actId={actId} set={set} />)
}