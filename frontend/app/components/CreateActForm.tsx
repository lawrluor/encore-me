'use client';

import { useState, useActionState } from 'react';

import { createAct } from '../services/actService';

export const CreateActForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /* In React <19, we would create a custom hook useCreateAct()
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
      {isFormVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus inline"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>}
    </button>

    {isFormVisible &&
      <div
        className="p-20 mb-1 w-100% flex gap-10 bg-background hover:opacity-80 hover:cursor-pointer"
      >
        <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
        <form id="createActForm" action={formAction} hidden={!isFormVisible}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Description" />
        </form>

        {/*        <div className="py-5">
          <button type="submit" className={`p-5 ${pending ? 'bg-gray-500 cursor-wait' : 'bg-blue-500 cursor-pointer'}`} disabled={pending}>ADD ACT</button>
        </div>*/}
      </div>}
  </>

  return <>
    <button onClick={() => setIsFormVisible(!isFormVisible)} className="h-44 p-5 font-bold cursor-pointer" aria-controls="createActForm" aria-expanded={!isFormVisible}>
      {isFormVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus inline"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>}
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
        {state?.error && <p className="text-red-500">{state?.error}</p>}
        {state?.success && <p className="text-green-500">{state?.success}</p>}
      </div>
    </form>
  </>
}