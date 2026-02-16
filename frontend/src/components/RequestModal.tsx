'use client';

import { useRef, useState } from 'react';

import { ButtonWithTransition } from './ButtonWithTransition';

import { type Song } from '@/types/song';

type Props = {
  songs: Song[];
  mock: boolean;
}

export const RequestModal = ({ songs, mock = false }: Props) => {
  const menu = useRef<HTMLDialogElement | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleClick = (song: Song) => {
    setSelectedSong(song);
    menu?.current?.showModal();
  };

  const handleClose = () => {
    menu?.current?.close();
    setSelectedSong(null);
  };

  return (<div className="flex flex-col gap-10">
    {songs.map((song: Song) =>
      <div key={song.id} className="grid grid-cols-2">
        <p className="truncate">{song.title}</p>
        <ButtonWithTransition className="justify-self-end text-sm py-4 px-8 rounded-md border-1 border-foreground-muted text-foreground-muted hover:bg-graygreen hover:text-foreground hover:border-graygreen hover:text-surface hover:opacity-100" onClick={() => handleClick(song)}>REQUEST</ButtonWithTransition>
      </div>)
    }

    {!mock && <dialog ref={menu} className="relative inset-0 m-auto bg-surface-muted w-[min(80dvw,600px)] h-[80dvh] p-20 rounded-md">
      <section className="absolute w-1/2 h-1/2 m-auto inset-0 flex flex-col items-center justify-center">
        <p className="text-foreground">Request {selectedSong?.title}?</p>
        <div className="flex gap-10">
          <ButtonWithTransition className="p-10 rounded-md border-1 border-foreground-muted text-foreground-muted" onClick={handleClose}>Cancel</ButtonWithTransition>
          <ButtonWithTransition className="bg-graygreen p-10 rounded-md">Confirm</ButtonWithTransition>
        </div>
      </section>
    </dialog>}
  </div>)
}