'use client';

import Form from 'next/form';
import { useState } from 'react';

import { postSetAction } from '../actions/setActions';

type Props = {
  actId: string;
}

export const CreateSetForm = ({ actId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <details>
      <summary>Create Set</summary>

      <Form action={postSetAction}>
        <input hidden type="text" name="actId" defaultValue={actId} />

        <div className="p-5">
          <label htmlFor="title" className="opacity-80">Title</label><span aria-hidden="true">*</span>
          <input id="title" name="title" type="text" spellCheck={false} autoComplete="off" className="block h-44 p-5 border-1 border-white border-solid" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="p-5">
          <label htmlFor="description" className="opacity-80">Description (optional)</label>
          <input id="description" name="description" type="text" spellCheck={false} autoComplete="off" className="block h-44 p-5 border-1 border-white border-solid" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="p-5">
          <button type="submit" className="p-5 bg-accent-muted cursor-pointer">CREATE SET</button>
        </div>
      </Form>
    </details>
  )
}