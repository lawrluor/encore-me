'use client';

import { useRef } from 'react';

import { Button } from './Button';

type Props = {
  songTitle: string;
  deleteAction: () => Promise<void>;
}

export const SongRowOptions = ({ deleteAction, songTitle }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative">
      <Button type="button" onClick={() => dialogRef?.current?.showModal()} aria-controls={`${songTitle}-options`} className="p-2 hover:bg-surface-muted rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-icon lucide-ellipsis w-18 h-18 text-foreground-muted"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
      </Button>

      <dialog
        id={`${songTitle}-options`}
        ref={dialogRef}
        className="m-auto bg-surface border border-surface-muted rounded-lg shadow-xl p-0 backdrop:bg-black/20 open:animate-in open:fade-in open:zoom-in-95 backdrop:backdrop-blur-[1px]"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="min-w-[200px]">
          <div className="px-16 py-12 border-b border-surface-muted">
            <p className="text-xs font-bold text-foreground-muted tracking-wider">OPTIONS</p>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <Button
              type="submit"
              onClick={() => {
                deleteAction();
                dialogRef.current?.close();
              }}
              className="w-full flex items-center justify-start px-12 py-8 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-md transition-colors shadow-none hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mr-8"><path d="M3 6h18" /><path d="M19 6v14c0 1-0 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
              <p className="truncate">Delete &quot;{songTitle}&quot;</p>
            </Button>

            <Button
              type="button"
              onClick={() => dialogRef?.current?.close()}
              className="w-full flex items-center justify-start px-12 py-8 text-sm text-foreground-muted hover:bg-surface-muted hover:text-foreground rounded-md transition-colors shadow-none hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mr-8"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  )
}