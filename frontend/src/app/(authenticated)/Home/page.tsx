import { redirect } from 'next/navigation';

import { ActsList } from '@/components/ActsList';
import { Footer } from '@/components/Footer';
import { LastPerformance } from '@/components/LastPerformance';
import { TopNav } from '@/components/TopNav';
import { getUserTree } from '@/lib/db/users';
import { getAuthUser } from '@/services/authService';

const Home = async () => {
  return (
    <div className="p-20">
      <LastPerformance />
    </div>
  )
}

export default Home;
