'use client';
import { JSX, useState } from 'react';

import { useRouter } from 'next/navigation';
import Form from 'next/form';

type PageType = 'login' | 'signup';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
};

const Signup = (): JSX.Element => {
  const router = useRouter();

  const [pageType, setPageType] = useState<PageType>("signup");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const fieldsValid = () => {
    try {
      if (!passwordIsValid()) throw new Error('Passwords must match');
      return true;
    } catch(err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        console.error("Unknown error", err);
        setErrorMessage("Something went wrong.")
      }
      return false;
    }
  }

  const passwordIsValid = () => {
    return password === passwordConfirm;
  }

  const createAccount = async () => {
    if (!fieldsValid()) return;

    let data = {
      "name": name,
      "email": email,
      "password": password
    }
    let success = false;
    setLoading(true);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
      console.log(endpoint);  // http://localhost:4200/api/users
      let response = await fetch(endpoint, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Error occurred: ${response.status}`);
      let successMessage = await response.json();
      console.log(successMessage);
      success = true;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error occurred: ${err.message}`);
      } else {
        console.log(`Unknown Error:`, err);
      }
      success = false;
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }

    return success;
  }

  const signup = async () => {
    try {
      if (await createAccount()) router.push('/Home');
    } catch (err) {
      console.error('Signup error:', err);
    }
  }

  const loginAccount = async () => {
    try {
      setLoading(true);

      let data = {
        "email": email,
        "password": password
      }

      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
      console.log(endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error(`Response failed: ${response.status}`);
      let result = await response.json();
      console.log(result);

      return true;
    } catch(err) {
      if (err instanceof Error) {
        console.error(`Error occurred: ${err.message}`);
      } else {
        console.error(`Unknown error:`, err);
      }
      
      setErrorMessage("Something went wrong. Please try again later.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const login = async () => {
    try {
      if (await loginAccount()) router.push('/Home');
    } catch (err) {
      console.error("Login error", err);
    }
  }

  return (
    pageType === "signup"
      ?
      <main>
        <header className="p-10">
          <h1 className="text-3xl">Sign Up</h1>
        </header>

        <section className="p-10">
          <Form action={signup} className="w-1/4">
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
              <button id="submit" type="submit" className="h-44 cursor-pointer p-10 bg-blue-500 rounded-sm" disabled={loading}>CREATE ACCOUNT</button>
            </div>

            {errorMessage && <div className="py-5"><p className="text-red-50">{errorMessage}</p></div>}
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
          <Form action={login} className="w-1/4">
            <div className="py-5">
              <label htmlFor="email" className="opacity-80">Email</label>
              <input id="email" name="email" type="email" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="py-5">
              <label htmlFor="password" className="opacity-80">Password</label>
              <input id="password" name="password" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="py-5">
              <button id="submit" type="submit" className="h-44 p-10 cursor-pointer bg-blue-500 rounded-sm" disabled={loading}>LOG IN</button>
            </div>

            {errorMessage && <div className="py-5"><p className="text-red-50">{errorMessage}</p></div>}
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