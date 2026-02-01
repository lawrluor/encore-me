import { redirect } from 'next/navigation';
import React from 'react';

import { ActsList } from '@/components/ActsList';
import { Footer } from '@/components/Footer';
import { TopNav } from '@/components/TopNav';
import { getUserTree } from '@/lib/db/users';
import { getAuthUser } from '@/services/authService';

type Props = {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
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

      <section className="flex flex-auto gap-10 p-10 overflow-hidden">
        <aside className="flex-[1_0_0] ">
          <ActsList />
        </aside>

        <section className="flex-[3_0_0] ">
          {children}
        </section>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout;
