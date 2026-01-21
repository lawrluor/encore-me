'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useDraggable } from '../hooks/useDraggable';
import { type Act } from '../types/act';

type Props = {
  initialActs: Act[];
}

export const ActsListDraggables = ({ initialActs }: Props) => {
  const { handleDragStart, handleDragOver, handleDrop } = useDraggable<Act, HTMLAnchorElement>();
  const [acts, setActs] = useState<Act[]>(initialActs);

  useEffect(() => {
    setActs(initialActs);
  }, [initialActs]);

  // Each item is both draggable and a drag target
  return (
    <div>
      {acts?.map((act: Act, index: number) => (
        <Link
          key={act.id}
          href={{ pathname: 'Act', query: { actId: act.id } }}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, act, index)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, index, acts, setActs)}
          className="py-10 w-100% flex gap-10 hover:opacity-80 hover:cursor-pointer"
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
