import { getActAction } from '../actions/actActions';

import { ActsList } from '../components/ActsList';
import { CreateSetForm } from '../components/CreateSetForm';
import { Footer } from '../components/Footer';
import { SetPanelsList } from '../components/SetPanelsList';
import { TopNav } from '../components/TopNav';

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
}

const Sets = async ({ searchParams }: Props) => {
  let { actId } = await searchParams;
  actId = typeof actId === "string" ? actId : undefined;  // narrow type
  let act = await getActAction(actId);  // if errors, take to error component

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
          <h2 className="text-2xl">{act?.name}</h2>  
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

export default Sets;