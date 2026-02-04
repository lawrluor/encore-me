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
        <RequestMenu set={set} songs={songs} />

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