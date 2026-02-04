import Form from 'next/form';

import { postActAction } from '../actions/actActions';

export const CreateActForm = () => {
  return (
    <details className="ml-10 mb-5 w-100%">
      <summary className="mb-5 marker:hidden list-none flex gap-10 items-center" aria-label="Create New Act">
        <h2 className="text-bold text-xl">Acts</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-20 h-20 cursor-pointer transition-all hover:opacity-60 duration-[0.15s] ease-in"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </summary>

      <div className="flex gap-10">
        <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
        <Form action={postActAction}>
          <label htmlFor="name" className="sr-only">Name</label>
          <input id="name" type="text" spellCheck={false} autoComplete="off" name="name" placeholder="Name" required className="outline-offset-5" />

          <label htmlFor="description" className="sr-only">Description (optional)</label>
          <input id="description" type="text" spellCheck={false} autoComplete="off" name="description" placeholder="Description (optional)" className="text-sm outline-offset-5" />
          <input hidden type="submit" />
        </Form>
      </div>
    </details>
  )
}