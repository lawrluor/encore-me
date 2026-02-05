import Form from 'next/form';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { signupUserAction } from '@/actions/authActions';
import { CustomLink } from '@/components/CustomLink';
import { getAuthUser } from '@/services/authService';

const Signup = async () => {
  const user = await getAuthUser();
  if (user) redirect('/home');

  return (
    <main className="flex items-stretch px-40 py-40">
      <header className="relative text-surface w-[min(80dvw,260px)] hidden min-sm:block rounded-l-md overflow-hidden">
        <Image src="/images/busking_800w.webp" alt="Guitarist giving an initimate live performance" width="800" height="1200" className="absolute h-full w-full object-cover" />
        <div className="absolute h-full w-full bg-gradient-to-br from-background/95 to-accent/20 p-20">
          <p className="text-5xl text-foreground">Your audience is waiting</p>
          {/* <p className="text-2xl text-foreground-muted">Join artists</p> */}
        </div>
      </header>

      <Form action={signupUserAction} className="flex flex-col gap-20 bg-surface rounded-md p-20 w-[min(80dvw,390px)] shadow-md min-sm:rounded-l-none">
        <div>
          <label htmlFor="name" className="text-foreground-muted">Name</label>
          <input id="name" name="name" type="text" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
        </div>

        <div>
          <label htmlFor="email" className="text-foreground-muted">Email</label>
          <input id="email" name="email" type="email" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
        </div>

        <div>
          <label htmlFor="password" className="text-foreground-muted">Password</label>
          <input id="password" name="password" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="text-foreground-muted">Confirm Password</label>
          <input id="passwordConfirm" name="passwordConfirm" type="password" spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" required />
        </div>

        <div className="mt-20">
          <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm bg-accent text-surface cursor-pointer hover:opacity-60 transition:all duration-[0.15s] ease-in disabled:cursor-wait disabled:opacity-60 float-right`}>CREATE ACCOUNT</button>
        </div>

        <div className="mt-[calc(-10px)] flex justify-end">
          <CustomLink href="/login">
            <p className="text-xs text-foreground-muted underline">I already have an account</p>
          </CustomLink>
        </div>
      </Form>
    </main>
  )
}

export default Signup;