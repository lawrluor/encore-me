import Form from 'next/form';

import { postActAction } from '../actions/actActions';

export const CreateActForm = () => {
  return (
    <details
      className="pb-5 w-100% bg-background hover:opacity-80 hover:cursor-pointer"
    >
      <summary className="cursor-pointer hover:opacity-60 mb-5">Create New Act</summary>
      <div className="flex gap-10">
        <div className="w-44 h-44 bg-accent rounded-md shrink-0"></div>
        <Form action={postActAction}>
          <label htmlFor="name" className="sr-only">Name</label>
          <input id="name" type="text" spellCheck={false} autoComplete="off" name="name" placeholder="Name" required />

          <label htmlFor="description" className="sr-only">Description (optional)</label>
          <input id="description" type="text" spellCheck={false} autoComplete="off" name="description" placeholder="Description (optional)" className="text-sm" />
          <input hidden type="submit" />
          {/*<button type="submit" className="p-5 bg-accent cursor-pointer">ADD ACT</button>*/}
        </Form>
      </div>
    </details>
  )
}