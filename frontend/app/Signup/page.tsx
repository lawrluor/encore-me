'use client';
import { JSX, useState } from 'react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';

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
          <Form action={submitForm}>
            <label htmlFor="name" className="opacity-80">Name</label>
            <input id="name" name="name" type="text" className="block h-44" value={name} onChange={e => setName(e.target.value)} />

            <label htmlFor="email" className="opacity-80">Email</label>
            <input id="email" name="email" type="email" className="block h-44" value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="password" className="opacity-80">Password</label>
            <input id="password" name="password" type="password" className="block h-44" value={password} onChange={e => setPassword(e.target.value)} />

            <label htmlFor="passwordRepeat" className="opacity-80">Confirm Password</label>
            <input id="passwordRepeat" name="passwordRepeat" type="password" className="block h-44" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />

            <button id="submit" type="submit" className="h-44 cursor-pointer">CREATE ACCOUNT</button>
            {/*<input id="submit" type="submit" className="h-44" />*/}
          </Form>

          <button type="button" onClick={() => switchPageType("login")} className="h-44 cursor-pointer">
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
          <Form action={submitForm}>
            <label htmlFor="email" className="opacity-80">Email</label>
            <input id="email" name="email" type="email" className="block h-44" value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="password" className="opacity-80">Password</label>
            <input id="password" name="password" type="password" className="block h-44" value={password} onChange={e => setPassword(e.target.value)} />

            <button id="submit" type="submit" className="h-44 cursor-pointer">LOG IN</button>
          </Form>

          <button type="button" className="h-44 cursor-pointer" onClick={() => switchPageType("signup")}>
            <p className="opacity-80 text-sm">I don&apos;t have an account</p>
          </button>
        </section>
      </main>
  )
}

export default Signup;