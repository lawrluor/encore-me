'use client';

import { useState, useActionState } from 'react';

import { createAct } from '../services/actService';
// import { useCreateAct } from '../hooks/useCreateAct';

type Props = {
  visible: boolean
}

export const CreateActForm = ({ visible }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /* In React <19, we would create a custom hook useCreateAct
      then import the hook's callback function execute() from there
      because useActionState IS the hook, we define the callback above (as we would import at the top)
    
      Note: this hook expects the executor function to return object with either 'success' or 'error' field, 
      which will become the 'state' variable
  */
  const executeCreateAct = async () => {
    try {
      const data = { 'name': name, 'description': description };
      const result = await createAct(data);
      return { 'success': result.message };
    } catch (err) {
      console.error(err);
      // Optionally display actual error message to user: err instanceof Error ? err.message : String(err) 
      return { 'error': 'Something went wrong. Please try again later.' };
    }
  }

  // state is basically error and success combined into one (state.success, state.error)
  // const { errorMessage, executeCreateAct, loading } = useCreateAct(); 
  const [state, formAction, pending] = useActionState(executeCreateAct, null);  // state starts null

  return <>
    <button onClick={() => setIsFormVisible(!isFormVisible)} className="h-44 p-5 font-bold cursor-pointer" aria-controls="createActForm" aria-expanded={!isFormVisible}>
      {isFormVisible ? "- hide form" : "+ add an act"}
    </button>

  <form id="createActForm" action={formAction} hidden={!isFormVisible}>
    <div className="py-5">
      <label htmlFor="name" className="opacity-80">Name</label>
      <input id="name" name="name" type="text" className="block p-5 border-1 border-white border-solid" value={name} onChange={e => setName(e.target.value)} required />
    </div>

    <div className="py-5">
      <label htmlFor="description" className="opacity-80">Description</label>
      <input id="description" name="description" type="text" className="block p-5 border-1 border-white border-solid" value={description} onChange={e => setDescription(e.target.value)} />
    </div>

    <div className="py-5">
      <button type="submit" className={`p-5 ${pending ? 'bg-gray-500 cursor-wait' : 'bg-blue-500 cursor-pointer'}`} disabled={pending}>ADD ACT</button>
    </div>

    <div className="py-5">
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </div>
  </form>
  </>
}