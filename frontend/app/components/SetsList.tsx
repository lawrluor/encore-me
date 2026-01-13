import Link from 'next/link';

import { useGetSets } from '../hooks/useGetSets';
import { useDeleteSet } from '../hooks/useDeleteSet';

type Props = {
  actId: string
}

export const SetsList = ({ actId }: Props) => {
  const { data, loading, errorMessage } = useGetSets({ actId });
  const { executeDelete, loading: deleteLoading, errorMessage: deleteErrorMessage } = useDeleteSet();

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (data.length === 0) return <p>No sets created yet. <Link href={{ pathname: 'Sets', query: { actId } }} className="underline font-bold text-blue-500 cursor-pointer hover:opacity-75">Create a new set</Link></p>;

  return data.map((set) => <div key={set.id}>
    <p className="text-red-500">{deleteErrorMessage}</p>
    <div className="flex gap-10">
      <Link className="hover:opacity-80" href={{ pathname: '/Set', query: actId }}><p className="font-bold">{set.title}</p></Link>
      <button className="cursor-pointer" type="button" onClick={() => executeDelete(set.id)} disabled={deleteLoading} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
    </div>
    {set.description && <p>{set.description}</p>}
  </div>
  )
}