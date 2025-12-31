'use client';
import { JSX, useState } from 'react';

import { useRouter } from 'next/navigation';
import Form from 'next/form';

type PageType = 'login' | 'signup';

const Signup = (): JSX.Element => {
  const router = useRouter();

  const [pageType, setPageType] = useState<PageType>("signup");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  // Guard against double/multiple clicks, which could happen if state change is slow
  const switchPageType = (next: PageType) => {
    // Idempotency: use function to say if the previous state already is the current one 
    // (due to multiple clicks in a row), make the other clicks have no effect. 
    setPageType((prev) => {
      if (prev === next) return prev;
      return next;
    });
  };

  const submitForm = () => {
    console.log("Submitted form");
    router.push('/Home');  // client-side navigation
  }

  return (
    pageType === "signup"
      ?
      <main>
        <header className="p-10">
          <h1 className="text-3xl">Sign Up</h1>
        </header>

        <section className="p-10">
          <Form action={submitForm} className="w-1/4">
            <div className="py-5">
              <label htmlFor="name" className="opacity-80">Name</label>
              <input id="name" name="name" type="text" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="py-5">
              <label htmlFor="email" className="opacity-80">Email</label>
              <input id="email" name="email" type="email" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="py-5">
              <label htmlFor="password" className="opacity-80">Password</label>
              <input id="password" name="password" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="py-5">
              <label htmlFor="passwordConfirm" className="opacity-80">Confirm Password</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
            </div>

            <div className="py-5">
              <button id="submit" type="submit" className="h-44 cursor-pointer p-10 bg-blue-500">CREATE ACCOUNT</button>
            </div>
          </Form>

          <button type="button" onClick={() => switchPageType("login")} className="h-44 cursor-pointer mt-5">
            <p className="opacity-80 text-sm">I already have an account</p>
          </button>
        </section>
      </main>
      :
      <main>
        <header className="p-10">
          <h1 className="text-3xl">Log In</h1>
        </header>

        <section className="p-10">
          <Form action={submitForm} className="w-1/4">
            <div className="py-5">
              <label htmlFor="email" className="opacity-80">Email</label>
              <input id="email" name="email" type="email" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="py-5">
              <label htmlFor="password" className="opacity-80">Password</label>
              <input id="password" name="password" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="py-5">
              <button id="submit" type="submit" className="h-44 p-10 cursor-pointer bg-blue-500">LOG IN</button>
            </div>
          </Form>

          <div className="py-5">
            <button type="button" className="h-44 cursor-pointer" onClick={() => switchPageType("signup")}>
              <p className="opacity-80 text-sm">I don&apos;t have an account</p>
            </button>
          </div>
        </section>
      </main>
  )
}

export default Signup;