import Link from 'next/link';

import { useGetSets } from '../hooks/useGetSets';
import { useDeleteSet } from '../hooks/useDeleteSet';

type Props = {
  actId: string
}

export const SetsList = ({ actId }: Props) => {
  const { data, loading, errorMessage } = useGetSets({ actId });
  const { deleteSet, result, loading: deleteLoading, errorMessage: deleteErrorMessage } = useDeleteSet();

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (data.length === 0) return <p>No sets created yet. <Link href={{ pathname: 'Sets', query: { actId } }} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</Link></p>;

  return data.map((set) => <div key={set.id}>
    <button className="bg-red-500 p-5 rounded" type="button" onClick={() => deleteSet(set.id)}>Delete Set</button>
    <p className="font-bold">{set.title}</p>
    {set.description && <p>{set.description}</p>}
  </div>
  )
}