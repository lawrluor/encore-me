import Form from 'next/form';
import { redirect } from 'next/navigation';

import { signupUserAction } from '@/actions/authActions';
import { CustomLink } from '@/components/CustomLink';
import { getAuthUser } from '@/services/authService';

const Signup = async () => {
  const user = await getAuthUser();
  if (user) redirect('/home');

  return (
    <main>
      <section className="p-40">
        <Form action={signupUserAction} className="flex flex-col gap-20">
          <div>
            <label htmlFor="name" className="opacity-80">Name</label>
            <input id="name" name="name" type="text" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
          </div>

          <div>
            <label htmlFor="email" className="opacity-80">Email</label>
            <input id="email" name="email" type="email" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
          </div>

          <div>
            <label htmlFor="password" className="opacity-80">Password</label>
            <input id="password" name="password" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="opacity-80">Confirm Password</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
          </div>

          <div>
            <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm bg-accent cursor-pointer hover:opacity-60 transition:all duration-[0.15s] ease-in disabled:cursor-wait disabled:opacity-60`}>CREATE ACCOUNT</button>
          </div>

          <CustomLink href="/login">
            <p className="text-sm text-foreground-muted underline">I already have an account</p>
          </CustomLink>
        </Form>
      </section>
    </main>
  )
}

export default Signup;