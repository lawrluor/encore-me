'use client';

import { useState } from 'react';

import { useDraggable } from '../hooks/useDraggable';
import { type Song } from '../types/song';

type Props = {
  initialSongs: Song[];
}

export const SongList = ({ initialSongs }: Props) => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const { handleDragStart, handleDragOver, handleDrop } = useDraggable<Song, HTMLDivElement>();

  return (
    <div className="rounded-md border border-surface-muted/40 bg-surface-muted/40 p-12">
      <div className="grid grid-cols-4 gap-10 pb-8 text-xs text-foreground-muted">
        <span className="col-span-2">SONG</span>
        <span className="hidden md:block">GENRE</span>
        <span className="hidden md:block">TEMPO</span>
      </div>

      <div className="flex flex-col gap-8">
        {songs.map((song: Song, idx: number) => (
          <div
            key={song.id}
            className="grid grid-cols-4 gap-10 rounded-sm border border-surface-muted/30 bg-surface px-10 py-8 text-sm"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, song, idx)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, idx, songs, setSongs)}
          >
            <div className="col-span-2">
              <p className="text-foreground">{song.title}</p>
              <p className="text-xs text-foreground-muted/80">{song.description}</p>
            </div>
            <span className="hidden md:block text-foreground-muted">{song.genre}</span>
            <span className="hidden md:block text-foreground-muted">{song.tempo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
