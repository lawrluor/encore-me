import Form from 'next/form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { signupUserAction } from '../../actions/authActions';
import { getAuthUser } from '../../services/authService';

const Signup = async () => {
  const user = await getAuthUser();
  if (user) redirect('/Home');

  return (
    <main>
      <header className="p-10">
        <h1 className="text-3xl">Sign Up</h1>
      </header>

      <section className="p-10">
        <Form action={signupUserAction} className="w-1/4">
          <div className="py-5">
            <label htmlFor="name" className="opacity-80">Name</label>
            <input id="name" name="name" type="text" spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" required />
          </div>

          <div className="py-5">
            <label htmlFor="email" className="opacity-80">Email</label>
            <input id="email" name="email" type="email" spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" required />
          </div>

          <div className="py-5">
            <label htmlFor="password" className="opacity-80">Password</label>
            <input id="password" name="password" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" required />
          </div>

          <div className="py-5">
            <label htmlFor="passwordConfirm" className="opacity-80">Confirm Password</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" required />
          </div>

          <div className="py-5">
            <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm bg-accent cursor-pointer`}>CREATE ACCOUNT</button>
          </div>
        </Form>

        <Link href="/Login" className="h-44 cursor-pointer">
          <p className="opacity-80 text-sm underline">I already have an account</p>
        </Link>
      </section>
    </main>
  )
}

export default Signup;