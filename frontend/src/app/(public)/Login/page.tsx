import Form from 'next/form';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { loginUserAction } from '@/actions/authActions';
import { CustomLink } from '@/components/CustomLink';
import { getAuthUser } from '@/services/authService';

const Login = async () => {
  const user = await getAuthUser();
  if (user) redirect('/home');

  return (
    <main className="flex py-40">
      <header className="relative ml-40 text-surface w-[min(80dvw,260px)] h-[min(50dvh,600px)] hidden min-sm:block rounded-l-md overflow-hidden">
        <Image src="/images/busking_drums_800w.webp" alt="Close-up of a drummer performing from the drummer's point of view" width="800" height="1200" className="absolute h-full w-full object-cover" />
        <div className="absolute h-full w-full bg-gradient-to-br from-background/90 to-accent/20 p-20">
          <p className="text-5xl text-foreground">Ready for your next gig?</p>
          {/* <p className="text-2xl text-foreground-muted">Join artists</p> */}
        </div>
      </header>

      <section className="bg-surface rounded-md ml-40 min-sm:rounded-none min-sm:rounded-r-md  min-sm:ml-0">
        <Form action={loginUserAction} className="flex flex-col gap-20 p-20 w-[min(80dvw,390px)] h-[min(50dvh,600px)] shadow-md">
          <div>
            <label htmlFor="email" className="text-foreground-muted">Email</label>
            <input id="email" name="email" type="email" defaultValue={process.env.NEXT_PUBLIC_USER_EMAIL || ''} spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" />
          </div>

          <div>
            <label htmlFor="password" className="text-foreground-muted">Password</label>
            <input id="password" name="password" type="password" defaultValue={process.env.NEXT_PUBLIC_USER_PASSWORD || ''} spellCheck={false} autoComplete="off" className="block h-44 w-full border-b-1 border-foreground-muted" />
          </div>

          <div className="mt-20">
            <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm bg-accent text-surface cursor-pointer hover:opacity-60 transition:all duration-[0.15s] ease-in disabled:cursor-wait disabled:opacity-60 float-right`}>LOG IN</button>
          </div>

          <div className="mt-[calc(-10px)] flex justify-end">
            <CustomLink href="/signup">
              <p className="text-xs text-foreground-muted underline">Sign up</p>
            </CustomLink>
          </div>
        </Form>
      </section>
    </main>
  )
}

export default Login;