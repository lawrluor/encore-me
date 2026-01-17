
import { ActsList } from './components/ActsList';
import { CreateActForm } from './components/CreateActForm';
import { LastPerformance } from './components/LastPerformance';
import { TopNav } from './components/TopNav';

const Home = () => {
  return (
    <div>
      <header>
        <TopNav />
      </header>

      <aside>
        <ActsList />
        <CreateActForm />
      </aside>

      <main>
        <section className="w-6/10 mx-auto p-10 rounded-md">
          <LastPerformance />
        </section>
      </main>

      {/*<section className="p-5">
        <h2 className="text-bold">SETS</h2>
      </section>*/}
    </div>
  )
}

export default Home;
