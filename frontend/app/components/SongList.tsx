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
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        <span>Title</span>
        <span>Description</span>
        <span>Genre</span>
        <span>Tempo</span>
      </div>

      {songs.map((song: Song, idx: number) => {
        return (
          <div
            key={song.id}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
            className="bg-blue-500 m-10"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, song, idx)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, idx, songs, setSongs)}
          >
            <span>{song.title}</span>
            <span>{song.description}</span>
            <span>{song.genre}</span>
            <span>{song.tempo}</span>
          </div>
        );
      })}
    </div>
  );
};
