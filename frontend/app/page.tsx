import { Greet } from './components/Greet';

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Greet name={"Lawrence"} />
    </div>
  );
}

export default Home;