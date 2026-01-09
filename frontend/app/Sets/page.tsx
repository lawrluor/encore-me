'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation'

import { useGetActs } from '../hooks/useGetActs';
import { usePostSet } from '../hooks/usePostSet';

import Form from 'next/form';
import { TopNav } from '../components/TopNav';

const Sets = () => {
  const searchParams = useSearchParams();
  const actId = searchParams.get('actId');

  const { responseOk, loading, errorMessage, postData } = usePostSet();
  const { acts, loading: actsLoading, errorMessage: actsErrorMessage } = useGetActs();

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

      <section>
        {acts?.map((act) => (
          <div key={act.id}>
            <h2>{act.title}</h2>
            <p>{act.description}</p>
          </div>
        ))}
      </section>

      <section className="p-5">
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
            <button type="submit" className="p-5 bg-blue-500" disabled={loading}>CREATE SET</button>
          </div>

          <div className="p-5">
            <p className="text-red-500" hidden={!errorMessage}>{errorMessage}</p>
            <p className="text-green-500" hidden={!responseOk}>Created Set Successfully</p>
          </div>
        </Form>
      </section>
    </main>
  )
}

export default Sets;