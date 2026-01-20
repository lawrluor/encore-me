import Form from 'next/form';

import { postActAction } from '../actions/actActions';

export const CreateActForm = () => {
  return <>
    {/*<button onClick={() => setIsFormVisible(!isFormVisible)} className="h-44 p-5 font-bold cursor-pointer" aria-controls="createActForm" aria-expanded={!isFormVisible}>
      {isFormVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus inline"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>}
    </button>*/}


    <div
      className="pb-5 w-100% flex gap-10 bg-background hover:opacity-80 hover:cursor-pointer"
    >
      <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
      <Form action={postActAction}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="description" placeholder="Description" className="text-sm" />
        <button type="submit" className="p-5 bg-accent cursor-pointer">ADD ACT</button>
      </Form>
    </div>
  </>

  return <>
    <button className="h-44 p-5 font-bold cursor-pointer">
      {isFormVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-minus-icon lucide-minus" aria-label="Hide the create act form"><path d="M5 12h14" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus inline" aria-label="Show the create act form"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>}
    </button>

    <form id="createActForm" action={formAction}>
      <div className="py-5">
        <label htmlFor="name" className="opacity-80">Name</label>
        <input id="name" name="name" type="text" className="block p-5 border-1 border-white border-solid" required />
      </div>

      <div className="py-5">
        <label htmlFor="description" className="opacity-80">Description</label>
        <input id="description" name="description" type="text" className="block p-5 border-1 border-white border-solid" />
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