'use client';

import { type Song } from '../types/Song';

import { useDraggable } from '../hooks/useDraggable';

export const SongList = ({ songs }: {songs: Song[]}) => {
	const { handleDragStart, handleDrop } = useDraggable<Song>();

	return <div>
	<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
	<span>Title</span>
	<span>Description</span>
	<span>Genre</span>
	<span>Tempo</span>
	</div>

	{songs.map((song: Song, idx: number) => {
	return <div key={song.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }} className="bg-blue-500 m-10" draggable={true} onDragStart={(e) => handleDragStart(e, song, idx)} onDrop={(e) => handleDrop(e, idx, songs)}>
	  <span>{song.title}</span>
	  <span>{song.description}</span>
	  <span>{song.genre}</span>
	  <span>{song.tempo}</span>
	</div>
	})}
	</div>
}