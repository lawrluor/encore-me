'use client';

import { useState, useRef } from 'react';

import { Button } from './Button';
import { type Song } from '@/types/song';

type Props = {
	songs: Song[]
}

export const RequestModal = ({ songs }: Props) => {
	 const menu = useRef(null);
	 const [title, setTitle] = useState("");

	 const handleClick = (song) => {
	 	setTitle(song.title);
	 	menu?.current?.showModal();
	 }
	
	return (<div className="flex flex-col gap-10">
		{songs.map((song) => 
			<div key={song.id} className="grid grid-cols-2">
			    <p className="truncate">{song.title}</p>
			    <Button onClick={handleClick.bind(null, song)}>Request</Button>
			</div>)
		}


      <dialog ref={menu} className="relative inset-0 m-auto bg-surface-muted w-[min(80dvw,600px)] h-[80dvh] p-20 rounded-md">
      	<section className="absolute w-1/2 h-1/2 m-auto inset-0">
	        {/*<h3 className="text-foreground text-lg text-foreground">Request</h3>*/}
	        <p className="text-foreground">Request {title}?</p>
	        <Button className="bg-graygreen p-10 rounded-md">Submit</Button>
	    </section>
      </dialog>
	</div>)
}