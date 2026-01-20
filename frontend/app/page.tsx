
import { ActsList } from './components/ActsList';
import { Footer } from './components/Footer';
import { LastPerformance } from './components/LastPerformance';
import { TopNav } from './components/TopNav';

const Home = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <TopNav />
      </header>

      <main className="flex flex-auto overflow-hidden">
        <aside className="flex-[1_0_0] ">
          <ActsList />
        </aside>

        <section className="p-10 rounded-md flex-[3_1_200px]">
          <LastPerformance />
        </section>
      </main>

      {/*<section className="p-5">
        <h2 className="text-bold">SETS</h2>
      </section>*/}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;
