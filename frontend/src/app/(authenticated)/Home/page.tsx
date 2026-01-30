import { redirect } from 'next/navigation';

import { ActsList } from '@/components/ActsList';
import { Footer } from '@/components/Footer';
import { LastPerformance } from '@/components/LastPerformance';
import { TopNav } from '@/components/TopNav';
import { getUserTree } from '@/lib/db/users';
import { getAuthUser } from '@/services/authService';

const Home = async () => {
  const user = await getAuthUser();
  if (!user) redirect('/Login');

  // is dependent on result of getAuthUser(),
  // but only takes a few ms for this function to finish verifying token cryptographically
  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Failed to fetch user data");

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

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;
