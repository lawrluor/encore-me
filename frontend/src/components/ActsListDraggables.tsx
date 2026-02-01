'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useDraggable } from '../hooks/useDraggable';
import { type Act } from '../types/act';

type Props = {
  initialActs: Act[];
}

export const ActsListDraggables = ({ initialActs }: Props) => {
  const { handleDragStart, handleDragOver, handleDrop } = useDraggable<Act, HTMLAnchorElement>();
  const [acts, setActs] = useState<Act[]>(initialActs);

  // Pre-populate selected act if readable from query string
  const params = useParams();
  const selectedActId = params.actId as string;
  const [selected, setSelected] = useState<string>(selectedActId || "");

  useEffect(() => {
    setActs(initialActs);
  }, [initialActs]);

  // Each item is both draggable and a drag target
  return (
    <div className="rounded-md">
      {acts?.map((act: Act, index: number) => (
        <Link
          key={act.id}
          href={`/Act/${act.id}`}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, act, index)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, index, acts, setActs)}
          onClick={() => setSelected(act.id)}
          className={`p-10 w-100% flex gap-10 hover:opacity-80 hover:cursor-pointer hover:bg-accent/10 rounded-md ${selected === act.id && 'bg-accent/10'}`}
        >
          <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
          <div>
            <p className="text-bold">{act.name}</p>
            <p className="text-sm opacity-60">{act.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
