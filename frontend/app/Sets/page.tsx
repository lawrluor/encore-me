
import { ActsList } from '../components/ActsList';
import { CreateSetForm } from '../components/CreateSetForm';
import { SetsList } from '../components/SetsList';
import { TopNav } from '../components/TopNav';

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
}

const Sets = async ({ searchParams }: Props) => {
  let { actId } = await searchParams;
  actId = typeof actId === "string" ? actId : undefined;  // narrow type

  return (
    <main>
      <header>
        <TopNav />
      </header>

      <aside>
        <ActsList />
      </aside>

      <section className="p-5 w-300 mx-auto">
        {actId && <CreateSetForm actId={actId} />}

        {actId && <SetsList actId={actId} showCta={false} />}
      </section>
    </main>
  )
}

export default Sets;