'use client';

import Form from 'next/form';
import { useState } from 'react';

import { postSetAction } from '../actions/setActions';

import { FormSubmitButton } from './FormSubmitter';

type Props = {
  actId: string;
}

export const CreateSetForm = ({ actId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <details className="p-20">
      <summary className="list-none flex gap-10 items-center">
        <p className="text-xl">Create Set</p>
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

      <Form action={postSetAction} className="mt-20 flex flex-col gap-20">
        <input hidden type="text" name="actId" defaultValue={actId} />

        <div>
          <label htmlFor="title" className="text-foreground-muted">Title</label>
          <input id="title" name="title" type="text" spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="description" className="text-foreground-muted">Description (optional)</label>
          <input id="description" name="description" type="text" spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="p-5">
          <FormSubmitButton title="CREATE SET" />
        </div>
      </Form>
    </details>
  )
}