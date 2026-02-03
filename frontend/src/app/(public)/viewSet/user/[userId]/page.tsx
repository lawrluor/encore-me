import Link from 'next/link';

import { RequestMenu } from '@/components/RequestMenu';
import { getSongsBySetId } from '@/lib/db/songs';
import { getUserById } from '@/lib/db/users';
import { type Song } from '@/types/song';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ViewSet = async ({ params }: Props) => {
  const { userId } = await params;
  if (!userId) throw new Error("User ID required");

  const user = await getUserById(userId)
  if (!user) throw new Error("User not found");

  const set = user.promoted_set
  if (!set) throw new Error("Set not found");

  const songs = await getSongsBySetId(set.id) as Song[];
  if (!songs) throw new Error("Songs not found");

  return (
    <main className="w-dvw h-dvh ">
      <div className="absolute inset-0 m-auto max-w-[min(80dvw,600px)] h-[80dvh] bg-surface translate-x-50% rounded-md">
        <header className="p-20 bg-graygreen rounded-t-md">
          <h2 className="text-2xl text-background">{set.title}</h2>
          {/* <p className="text-foreground-muted">{set.description}</p> */}
          {/* <p className="text-foreground-muted">{act.name}</p> */}
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