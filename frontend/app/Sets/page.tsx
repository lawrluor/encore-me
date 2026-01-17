'use client'

import Form from 'next/form';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

import { ActsList } from '../components/ActsList';
import { SetsList } from '../components/SetsList';
import { TopNav } from '../components/TopNav';
import { usePostSet } from '../hooks/usePostSet';

const Sets = () => {
  const searchParams = useSearchParams();
  const actId = searchParams.get('actId');

  const { responseOk, loading, errorMessage, postData } = usePostSet();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = async () => {
    if (!actId) {
      console.error('No actId provided');
      return;
    }

    const data = {
      actId: actId,
      title: title,
      description: description
    }

    // reset form state if successful
    const result = await postData(data);
    if (result) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <main>
      <header>
        <TopNav />
      </header>

      <aside>
        <ActsList />
      </aside>

      <section className="p-5 w-300 mx-auto">
        <h1 className="text-3xl">Sets</h1>
        <Form action={submitForm}>
          <div className="p-5">
            <label htmlFor="title" className="opacity-80">Title</label><span aria-hidden="true">*</span>
            <input id="title" name="title" type="text" className="block h-44 p-5 border-1 border-white border-solid" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="p-5">
            <label htmlFor="description" className="opacity-80">Description</label>
            <input id="description" name="description" type="text" className="block h-44 p-5 border-1 border-white border-solid" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="p-5">
            <button type="submit" className="p-5 bg-blue-500 cursor-pointer" disabled={loading}>CREATE SET</button>
          </div>

          <div className="p-5">
            <p className="text-red-500" hidden={!errorMessage}>{errorMessage}</p>
            <p className="text-green-500" hidden={!responseOk}>Created Set Successfully</p>
          </div>
        </Form>

        {actId && <SetsList actId={actId} showCta={false} />}
      </section>
    </main>
  )
}

export default Sets;