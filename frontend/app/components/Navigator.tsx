import { useAuth } from '../context/AuthProvider';
import Home from '../Home/page';
import Signup from '../Signup/page';

const Navigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Loading...</p>
    </div>
  }

  return <div className="bg-zinc-50 font-sans dark:bg-black">
    {user ? <Home /> : <Signup />}
  </div>
};

export default Navigator;