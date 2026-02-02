import Form from 'next/form';
import { redirect } from 'next/navigation';

import { loginUserAction } from '@/actions/authActions';
import { CustomLink } from '@/components/CustomLink';
import { getAuthUser } from '@/services/authService';

const Login = async () => {
  const user = await getAuthUser();
  if (user) redirect('/home');

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
            <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm bg-accent cursor-pointer hover:opacity-60 transition:all duration-[0.15s] ease-in disabled:cursor-wait disabled:opacity-60`}>LOG IN</button>
          </div>
        </Form>

        <div className="py-5">
          <CustomLink href="/signup">
            <p className="text-sm text-foreground-muted underline">I don&apos;t have an account</p>
          </CustomLink>
        </div>
      </section>
    </main>
  )
}

export default Login;