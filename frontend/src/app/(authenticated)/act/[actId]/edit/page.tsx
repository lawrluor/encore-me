import { redirect } from 'next/navigation';

import { deleteActAction, putActAction } from '@/actions/actActions';
import { FormSubmitButton } from '@/components/FormSubmitter';
import { getActById } from '@/lib/db/acts';
import { getUserTree } from '@/lib/db/users';
import { getAuthUser } from '@/services/authService';
import { type Act } from '@/types/act';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EditAct = async ({ params }: Props) => {
  const auth = await getAuthUser();
  if (auth.status === 'expired') redirect('/login?error=session_expired');
  if (auth.status !== 'authenticated') redirect('/login');
  const user = auth.user;

  let { actId } = await params;
  if (!actId) throw new Error("Act must have an ID");
  actId = String(actId);

  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Error fetching data for user");

  let act = userTree.acts.find((act: Act) => act.id === actId) ?? null;
  if (!act) act = await getActById(actId);  // fallback if Act not in user tree
  if (!act) throw new Error("Act not found");

  return (
    <main className="bg-surface p-20 rounded-md">
      <div className="gap-10">
        <h2 className="text-2xl block pb-20">Edit Act</h2>
      </div>

      <div className="flex gap-5">
        <form>
          <div className="flex flex-col gap-20">
            <div>
              <label className="text-foreground-muted">Name</label>
              <input className="block border-b-1 border-foreground-muted" type="text" name="name" defaultValue={act.name} />
            </div>

            <div>
              <label className="text-foreground-muted">Description</label>
              <input className="block border-b-1 border-foreground-muted" type="text" name="description" defaultValue={act.description} />
            </div>
          </div>

          <div className="flex py-20 gap-10">
            <FormSubmitButton formAction={deleteActAction.bind(null, act.id)} className="bg-surface text-foreground-muted border-foreground-muted border-1">
              {/* <svg aria-label="Delete Act" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash relative top-4"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg> */}
              Delete
            </FormSubmitButton>

            <FormSubmitButton formAction={putActAction.bind(null, act.id)} className="text-surface">Save</FormSubmitButton>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditAct;