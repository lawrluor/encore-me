import Form from 'next/form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { loginUserAction } from '../../actions/authActions';
import { getAuthUser } from '../../services/authService';

const Login = async () => {
  const user = await getAuthUser();
  if (user) redirect('/Home');

  return (
    <main>
      <header className="p-10">
        <h1 className="text-3xl">Log In</h1>
      </header>

      <section className="p-10">
        <Form action={loginUserAction} className="w-1/4">
          <div className="py-5">
            <label htmlFor="email" className="opacity-80">Email</label>
            <input id="email" name="email" type="email" defaultValue={process.env.NEXT_PUBLIC_USER_EMAIL || ''} spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" />
          </div>

          <div className="py-5">
            <label htmlFor="password" className="opacity-80">Password</label>
            <input id="password" name="password" type="password" defaultValue={process.env.NEXT_PUBLIC_USER_PASSWORD || ''} spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" />
          </div>

          <div className="py-5">
            <button id="submit" type="submit" className={'h-44 cursor-pointer p-10 rounded-sm bg-accent'}>LOG IN</button>
          </div>
        </Form>

        <div className="py-5">
          <Link href="/Signup">
            <p className="opacity-80 text-sm underline">I don&apos;t have an account</p>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login;