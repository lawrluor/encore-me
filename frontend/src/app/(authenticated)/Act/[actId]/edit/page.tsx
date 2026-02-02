import { redirect } from 'next/navigation';

import { deleteActAction, putActAction } from '@/actions/actActions';
import { FormSubmitter } from '@/components/FormSubmitter';
import { getUserTree } from '@/lib/db/users';
import { getAct } from '@/services/actService';
import { getAuthUser } from '@/services/authService';
import { type Act } from '@/types/act';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EditAct = async ({ params }: Props) => {
  const user = await getAuthUser();
  if (!user) redirect('/Login');

  let { actId } = await params;
  if (!actId) throw new Error("Act must have an ID");
  actId = String(actId);

  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Error fetching data for user");

  let act = userTree.acts.find((act: Act) => act.id === actId);
  if (!act) act = await getAct(actId);  // fallback if Act not in user tree
  if (!act) throw new Error("Act not found");

  return (
    <main>
      <h2>Edit Act</h2>
      <div className="flex flex-row items-center gap-5">
        <form action={putActAction.bind(null, act.id)}>
          <div>
            <label className="sr-only">Name</label>
            <input className="text-2xl block" type="text" name="name" defaultValue={act.name} />

            <label className="sr-only">Description</label>
            <input className="text-md text-foreground-muted block" type="text" name="description" defaultValue={act.description} />
          </div>

          <input hidden type="submit" />
        </form>

        <form action={deleteActAction.bind(null, act.id)}>
          <FormSubmitter type="submit" className="cursor-pointer hover:opacity-60 flex justify-center">
            <svg aria-label="Delete Act" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
          </FormSubmitter>
        </form>
      </div>
    </main>
  )
}

export default EditAct;