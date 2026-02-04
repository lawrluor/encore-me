import Link from 'next/link';

import { RequestModal } from './RequestModal';

import { type Set } from '@/types/set';
import { type Song } from '@/types/song';

type Props = {
  set: Set;
  songs: Song[];
  mock: boolean;
}

export const RequestMenu = ({ set, songs, mock = false }: Props) => {
  return (
    <div className="relative">
      <header className="p-20 bg-graygreen rounded-t-md">
        <h2 className="text-2xl text-background">{set.title}</h2>
        {/* <p className="text-foreground-muted">{set.description}</p> */}
        {/* <p className="text-foreground-muted">{act.name}</p> */}
      </header>

      <section className="p-20">
        <RequestModal songs={songs} mock={mock} />
      </section>

      {!mock && <section className="absolute w-full bottom-0 p-20">
        <div className="w-300 mx-auto text-center">
          <Link href="/terms" className="text-xs text-foreground-muted mr-12.5 hover:opacity-60 transition-all duration-[0.15s] ease-in">terms & conditions</Link>
          <Link href="/policy" className="text-xs text-foreground-muted hover:opacity-60 transition-all duration-[0.15s] ease-in">privacy policy</Link>
        </div>
      </section>}
    </div>
  )
}