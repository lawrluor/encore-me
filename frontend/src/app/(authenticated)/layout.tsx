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
  const auth = await getAuthUser();
  if (auth.status === 'expired') redirect('/login?error=session_expired');
  if (auth.status !== 'authenticated') redirect('/login');
  const user = auth.user;

  // is dependent on result of getAuthUser(),
  // but only takes a few ms for this function to finish verifying token cryptographically
  const userTree = await getUserTree(user.id);
  if (!userTree) throw new Error("Failed to fetch user data");

  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <TopNav authenticated={true} border={true} />
      </header>

      <div className="flex flex-auto gap-20 p-20 overflow-hidden">
        <aside className="flex-[1_0_0] ">
          <ActsList acts={userTree.acts} userId={user.id} />
        </aside>

        <section className="flex-[3_0_0] overflow-hidden">
          {children}
        </section>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout;
