import Form from 'next/form';
import { useState } from 'react';

type ActFormPayload = {
  'title': string,
  'description': string
}

type Props = {
  'id': string,
  'hidden': boolean
}

export const CreateActForm = ({ id, hidden }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createAct = async () => {
    const data: ActFormPayload = { 'title': name, 'description': description };
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error(`Response failed: ${response.status}`);

    const result = await response.json();
    if (!result) throw new Error(`Error: No response`);
    return result;
  }

  const submitForm = async () => {
    try {
      const result = await createAct();
      console.log(result);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message);
    }
  }

  return <Form id={id} action={submitForm} hidden={hidden}>
    <div className="py-5">
      <label htmlFor="title" className="opacity-80">Name</label>
      <input id="title" name="title" type="text" className="block p-5 border-1 border-white border-solid" value={name} onChange={e => setName(e.target.value)} />
    </div>

    <div className="py-5">
      <label htmlFor="description" className="opacity-80">Description</label>
      <input id="description" name="description" type="text" className="block p-5 border-1 border-white border-solid" value={description} onChange={e => setDescription(e.target.value)} />
    </div>

    <div className="py-5">
      <button type="submit" className="p-5 cursor-pointer bg-blue-500">ADD ACT</button>
    </div>

    <div className="py-5">
      <p>{errorMessage}</p>
    </div>
  </Form>
}