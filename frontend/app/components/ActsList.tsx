'use client';

import Link from 'next/link';

import { CreateActForm } from '../components/CreateActForm';
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
    <>
      <div>
        <h2 className="ml-10 text-bold text-xl">ACTS</h2>
        <CreateActForm /> 
      </div>

      <div>
        {acts?.map((act, index) => (
          <div
            draggable={true}
            onDragStart={(e) => handleDragStart(e, act, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, index, acts, setActs)}
            className="p-20 mb-1 w-100% flex gap-10 bg-background hover:opacity-80 hover:cursor-pointer"
            key={act.id}
          >
            <div className="w-44 h-44 bg-accent rounded-md"></div>
            <div>
              <Link draggable={false} href={{ pathname: 'Sets', query: { actId: act.id } }}><p className="text-bold">{act.name}</p></Link>
              <p className="text-sm">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
