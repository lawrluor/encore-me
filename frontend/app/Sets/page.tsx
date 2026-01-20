
import { ActsList } from '../components/ActsList';
import { CreateSetForm } from '../components/CreateSetForm';
import { SetsList } from '../components/SetsList';
import { TopNav } from '../components/TopNav';

const Sets = async ({ searchParams }) => {
  const { actId } = await searchParams;

  return (
    <main>
      <header>
        <TopNav />
      </header>

      <aside>
        <ActsList />
      </aside>

      <section className="p-5 w-300 mx-auto">
        <CreateSetForm actId={actId} />

        {actId && <SetsList actId={actId} showCta={false} />}
      </section>
    </main>
  )
}

export default Sets;