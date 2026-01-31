import { redirect } from 'next/navigation';

import { deleteActAction, putActAction } from '@/actions/actActions';
import { ActsList } from '@/components/ActsList';
import { CreateSetForm } from '@/components/CreateSetForm';
import { Footer } from '@/components/Footer';
import { FormSubmitter } from '@/components/FormSubmitter';
import { SetPanelsList } from '@/components/SetPanelsList';
import { TopNav } from '@/components/TopNav';
import { getUserTree } from '@/lib/db/users';
import { getAct } from '@/services/actService';
import { getAuthUser } from '@/services/authService';
import { type Act } from '@/types/act';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Act = async ({ params }: Props) => {
  const user = await getAuthUser();
  if (!user) redirect('/Login');

  let { actId } = await params;
  if (!actId) throw new Error("Act must have an ID");
  actId = String(actId);

  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Error fetching data for user");

  let act = userTree.acts.find((act: Act) => act.id === actId);
  if (!act) act = await getAct(actId);  // fallback if Act not in user tree

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <TopNav />
      </header>

      <main className="flex flex-auto overflow-hidden">
        <aside className="flex-[1_0_0] ">
          <ActsList />
        </aside>

        <section className="p-20 rounded-md flex-[3_1_200px]">
          <div className="flex flex-row items-center gap-5">
            <form action={putActAction}>
              <h2 className="sr-only">{act?.name}</h2>
              <input hidden type="text" name="id" defaultValue={actId} />
              <input className="text-2xl" type="text" name="name" defaultValue={act?.name} />
              <input hidden type="submit" />
            </form>

            <form action={deleteActAction}>
              <input hidden defaultValue={act?.id} name="id" />
              <FormSubmitter type="submit" className="cursor-pointer hover:opacity-60 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-minus-icon lucide-circle-minus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
              </FormSubmitter>
            </form>
          </div>

          <div className="mb-10">
            {actId && <CreateSetForm actId={actId} />}
          </div>

          <div>
            {actId && <SetPanelsList sets={act.sets} actId={actId} showCta={false} />}
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Act;