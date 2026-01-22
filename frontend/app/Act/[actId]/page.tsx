import { deleteActAction, putActAction } from '../../actions/actActions';
import { ActsList } from '../../components/ActsList';
import { CreateSetForm } from '../../components/CreateSetForm';
import { Footer } from '../../components/Footer';
import { SetPanelsList } from '../../components/SetPanelsList';
import { TopNav } from '../../components/TopNav';
import { getAct } from '../../services/actService';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Act = async ({ params }: Props) => {
  let { actId } = await params;
  if (!actId) throw new Error("Act must have an ID");

  actId = String(actId);
  const act = await getAct(actId);

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
              <button type="submit" className="hover:opacity-60 cursor-pointer flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-minus-icon lucide-circle-minus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
              </button>
            </form>
          </div>

          {actId && <CreateSetForm actId={actId} />}
          {actId && <SetPanelsList actId={actId} showCta={false} />}
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Act;