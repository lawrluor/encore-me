import { redirect } from 'next/navigation';

import { ActsList } from '../../../components/ActsList';
import { Footer } from '../../../components/Footer';
import { LastPerformance } from '../../../components/LastPerformance';
import { TopNav } from '../../../components/TopNav';
import { getAuthUser } from '../../../services/authService';
import { getUserTree } from '../../../services/userService';

const Home = async () => {
  const user = await getAuthUser();
  if (!user) redirect('/Login');

  // getUserTree is dependendent on user id. 
  // TODO: refactor to allow getAuthUser to also return the data tree to 
  // avoid this request waterfall
  // OR, just use user cookie to fetch getUserTree just like in getActs
  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Failed to fetch user data");

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <TopNav />
      </header>

      <main className="flex flex-auto overflow-hidden">
        <aside className="flex-[1_0_0] ">
          <ActsList  />
        </aside>

        <section className="p-10 rounded-md flex-[3_1_200px]">
          <LastPerformance />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;
