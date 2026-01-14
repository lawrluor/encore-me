'use client';

import { useGetActs } from '../hooks/useGetActs';
import Link from 'next/link';

export const ActsList = () => {
  const { acts, loading, errorMessage } = useGetActs();

  if (loading) return (<p>Loading...</p>);

  if (errorMessage) return (<p className="text-red-500">{errorMessage}</p>);

  if (acts.length === 0) return (<p>No acts created</p>);

  return (
    <div>
      <h2 className="text-bold text-xl">ACTS</h2>
      {acts?.map((act) => (
        <div key={act.id}>
          <Link href={{ pathname: 'Sets', query: { actId: act.id } }}><h2 className="text-bold cursor-pointer hover:opacity-80">{act.name}</h2></Link>
        </div>
      ))}
    </div>
  )
}
