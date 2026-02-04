import Link from 'next/link';

import { RequestMenu } from '@/components/RequestMenu';
import { getActById } from '@/lib/db/acts';
import { getSetById } from '@/lib/db/sets';
import { getSongsBySetId } from '@/lib/db/songs';
import { type Act } from '@/types/act';
import { type Set } from '@/types/set';
import { type Song } from '@/types/song';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ViewSet = async ({ params }: Props) => {
  const { actId, setId } = await params;
  if (!setId) throw new Error("Set ID required");
  if (!actId) throw new Error("Act ID required");

  const [set, songs, act] = await Promise.all([getSetById(setId), getSongsBySetId(setId), getActById(actId)]) as [Set, Song[], Act];
  if (!set) throw new Error("Set not found");

  return (
    <main className="w-dvw h-dvh ">
      <div className="absolute inset-0 m-auto max-w-[min(80dvw,600px)] h-[80dvh] bg-surface translate-x-50% rounded-md">
        <header className="p-20 bg-graygreen rounded-t-md">
          <h2 className="text-2xl text-background">{set.title}</h2>
          {/* <p className="text-foreground-muted">{set.description}</p> */}
          <p className="text-foreground-muted">{act.name}</p>
        </header>

        <section className="p-20">
          <RequestMenu songs={songs} />
        </section>

        <section className="absolute w-full bottom-0 p-20">
          <div className="w-300 mx-auto text-center">
            <Link href="/terms" className="text-xs text-foreground-muted mr-12.5 hover:opacity-60 transition-all duration-[0.15s] ease-in">terms & conditions</Link>
            <Link href="/policy" className="text-xs text-foreground-muted hover:opacity-60 transition-all duration-[0.15s] ease-in">privacy policy</Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ViewSet;