'use client';

import { CustomLink } from './CustomLink';

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

  useEffect(() => {
    setActs(initialActs);
  }, [initialActs]);

  // transition: all 1s ease-in

  // Each item is both draggable and a drag target
  return (
    <div className="rounded-md">
      {acts?.map((act: Act, index: number) => {
        const isSelected = selectedActId === act.id;
        return <div key={act.id} className="relative">
          <CustomLink
            href={`/Act/${act.id}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, act, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, index, acts, setActs)}
            className={`p-10 w-100% flex gap-10 hover:cursor-pointer ${isSelected ? "" : "hover:bg-accent/10 hover:opacity-80"} rounded-md ${isSelected && 'bg-accent/10'} transition-all duration-[0.15s] ease-in`}
          >
            <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
            <div>
              <p className="text-bold">{act.name}</p>
              <p className="text-sm text-foreground-muted">{act.description}</p>
            </div>
          </CustomLink>

          {isSelected && <CustomLink href={`/Act/${act.id}/edit`} className="absolute right-10 top-10 text-foreground-muted hover:opacity-60 transition-all duration-[0.15s] ease-in"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil h-16 w-16"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg></CustomLink>}
        </div>
      })}
    </div>
  )
}
