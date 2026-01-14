import Link from 'next/link';

import { useDeleteSet } from '../hooks/useDeleteSet';

type Props = {
  actId: string,
  set: {
    id: string,
    title: string,
    description?: string
  }
}

export const SetCard = ({ actId, set }: Props) => {
  const { executeDelete, loading: deleteLoading, errorMessage: deleteErrorMessage } = useDeleteSet();

  const promoteSet = () => {
    return;
  }

  return (
    <div>
      <p className="text-red-500">{deleteErrorMessage}</p>
      <div className="flex gap-10">
        <Link className="hover:opacity-80" href={{ pathname: '/Set', query: actId }}><p className="font-bold">{set.title}</p></Link>
        <button className="cursor-pointer" type="button" onClick={promoteSet}>Use</button>
        <button className="cursor-pointer" type="button" onClick={() => executeDelete(set.id)} disabled={deleteLoading} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
      </div>
      {set.description && <p>{set.description}</p>}
    </div>
  )
}