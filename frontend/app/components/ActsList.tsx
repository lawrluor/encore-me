'use client';

import Link from 'next/link';

import { useDraggable } from '../hooks/useDraggable';
import { useGetActs } from '../hooks/useGetActs';
import { type Act } from '../types/act';

export const ActsList = () => {
  const { acts, setActs, loading, errorMessage } = useGetActs();
  const { handleDragStart, handleDragOver, handleDrop } = useDraggable<Act>();

  // Guard original acts state, then map over data
  if (loading) return (<p>Loading...</p>);

  if (errorMessage) return (<p className="text-red-500">{errorMessage}</p>);

  if (acts.length === 0) return (<p>No acts created</p>);

  // Cards are both draggable and drag targets
  return (
    <div>
      <h2 className="text-bold text-xl">ACTS</h2>
      {acts?.map((act, index) => (
        <div
          draggable={true}
          onDragStart={(e) => handleDragStart(e, act, index)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, index, acts, setActs)}
          className="p-20 m-20 w-200 bg-red-500"
          key={act.id}
        >
          <Link draggable={false} href={{ pathname: 'Sets', query: { actId: act.id } }}><h2 className="text-bold cursor-pointer hover:opacity-80">{act.name}</h2></Link>
        </div>
      ))}
    </div>
  )
}
