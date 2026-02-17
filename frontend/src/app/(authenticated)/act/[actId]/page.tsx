import { redirect } from 'next/navigation';

import { CreateSetForm } from '@/components/CreateSetForm';
import { SetPanelsList } from '@/components/SetPanelsList';
import { getUserTree } from '@/lib/db/users';
import { getAct } from '@/services/actService';
import { getAuthUser } from '@/services/authService';
import { type Act } from '@/types/act';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Act = async ({ params }: Props) => {
  const auth = await getAuthUser();
  if (auth.status === 'expired') redirect('/login?error=session_expired');
  if (auth.status !== 'authenticated') redirect('/login');
  const user = auth.user;

  let { actId } = await params;
  if (!actId) throw new Error("Act must have an ID");
  actId = String(actId);

  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Error fetching data for user");

  let act = userTree.acts.find((act: Act) => act.id === actId);
  if (!act) act = await getAct(actId);  // fallback if Act not in user tree
  if (!act) throw new Error("Act not found");

  return (
    <main className="flex flex-col gap-20">
      <div className="flex flex-col gap-20">
        {actId && <CreateSetForm actId={act.id} />}
      </div>

      <div>
        {actId && <SetPanelsList sets={act.sets} actId={act.id} showCta={false} />}
      </div>
    </main>
  )
}

export default Act;