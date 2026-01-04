import { useAuth } from '../context/AuthProvider';

const Navigator = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Loading...</p>
    </div>
  }

  return null;
};

export default Navigator;