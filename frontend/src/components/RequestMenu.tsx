import { RequestModal } from './RequestModal';

import { type Set } from '@/types/set';
import { type Song } from '@/types/song';

type Props = {
  set: Set;
  songs: Song[];
  mock?: boolean;
}

export const RequestMenu = ({ set, songs, mock = false }: Props) => {
  return (
    <div className="relative bg-gradient-to-b from-surface-muted to-surface shadow-md rounded-md">
      <header className="p-20 bg-gradient-to-b from-lightgraygreen to-graygreen rounded-t-md">
        <h2 className="text-2xl text-background">{set.title}</h2>
        {/* <p className="text-foreground-muted">{set.description}</p> */}
        {/* <p className="text-foreground-muted">{act.name}</p> */}
      </header>

      <section className="p-20">
        <RequestModal songs={songs} mock={mock} />
      </section>
    </div>
  )
}