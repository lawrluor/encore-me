'use client';
import { useState } from 'react';

import { useAuth } from "../context/AuthProvider";

import Form from 'next/form';

type PageType = 'login' | 'signup';

const Signup = () => {
  const { setUser } = useAuth();
  const [pageType, setPageType] = useState<PageType>("signup");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Guard against double/multiple clicks, which could happen if state change is slow
  const switchPageType = (next: PageType) => {
    // Idempotency: use function to say if the previous state already is the current one 
    // (due to multiple clicks in a row), make the other clicks have no effect. 
    setPageType((prev) => {
      if (prev === next) return prev;
      return next;
    });
  };

  const handleSignupInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return;
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  const fieldsValid = () => {
    try {
      if (!passwordIsValid()) throw new Error('Passwords must match');
      return true;
    } catch (err) {
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
    return info.password === info.passwordConfirm;
  }

  const createAccount = async () => {
    try {
      setLoading(true);

      if (!fieldsValid()) throw new Error("Form fields are invalid")

      const data = {
        "name": info.name,
        "email": info.email,
        "password": info.password
      }

      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || String(response.status));

      if (!result || !result.data) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);
      return result.data;
    } finally {
      setLoading(false);
    }
  }

  const signup = async () => {
    try {
      const userData = await createAccount();
      if (userData) {
        localStorage.setItem('token', userData.token);
        setUser(userData.user);
      }
    } catch (err) {
      if (err instanceof Error) console.error(JSON.stringify(err.message))
      else console.error(String(err));
      setErrorMessage("Something went wrong. Please try again later.");
    }
  }

  const loginAccount = async () => {
    try {
      setLoading(true);

      const data = {
        "email": info.email,
        "password": info.password
      }

      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error(`Response failed: ${response.status}`);
      const result = await response.json();

      if (!result || !result.data) throw new Error(`Unexpected result: ${JSON.stringify(result)}`);
      return result.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const login = async () => {
    try {
      const userData = await loginAccount();
      if (userData) {
        localStorage.setItem('token', userData.token);
        setUser(userData.user);
      }
    } catch (err) {
      console.error("Login error", err);
      setErrorMessage("Something went wrong. Please try again later.");
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
              <input id="name" name="name" type="text" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.name} onChange={e => handleSignupInfo(e)} required />
            </div>

            <div className="py-5">
              <label htmlFor="email" className="opacity-80">Email</label>
              <input id="email" name="email" type="email" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.email} onChange={e => handleSignupInfo(e)} required />
            </div>

            <div className="py-5">
              <label htmlFor="password" className="opacity-80">Password</label>
              <input id="password" name="password" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.password} onChange={e => handleSignupInfo(e)} required />
            </div>

            <div className="py-5">
              <label htmlFor="passwordConfirm" className="opacity-80">Confirm Password</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.passwordConfirm} onChange={e => handleSignupInfo(e)} required />
            </div>

            <div className="py-5">
              <button id="submit" type="submit" className={`min-h-44 p-10 rounded-sm ${loading ? 'bg-gray-500 cursor-loading' : 'bg-blue-500 cursor-pointer'}`} disabled={loading}>CREATE ACCOUNT</button>
            </div>

            {errorMessage && <div className="py-5"><p className="text-red-50">{errorMessage}</p></div>}
          </Form>

          <button type="button" onClick={() => switchPageType("login")} className="h-44 cursor-pointer">
            <p className="opacity-80 text-sm underline">I already have an account</p>
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
              <input id="email" name="email" type="email" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.email} onChange={e => handleSignupInfo(e)} />
            </div>

            <div className="py-5">
              <label htmlFor="password" className="opacity-80">Password</label>
              <input id="password" name="password" type="password" className="block h-44 w-full p-10 border-1 border-white border-solid rounded-sm" value={info.password} onChange={e => handleSignupInfo(e)} />
            </div>

            <div className="py-5">
              <button id="submit" type="submit" className={`h-44 cursor-pointer p-10 rounded-sm ${loading ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={loading}>LOG IN</button>
            </div>

            {errorMessage && <div className="py-5"><p className="text-red-50">{errorMessage}</p></div>}
          </Form>

          <div className="py-5">
            <button type="button" className={`h-44 ${loading ? 'cursor-loading' : 'cursor-pointer'}`} disabled={loading} onClick={() => switchPageType("signup")}>
              <p className="opacity-80 text-sm underline">I don&apos;t have an account</p>
            </button>
          </div>
        </section>
      </main>
  )
}

export default Signup;