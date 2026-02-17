import Form from 'next/form';

import { postSongAction } from '../actions/songActions';

import { FormSubmitButton } from './FormSubmitter';

// Pass both setId and actId to backend. Backend will prioritize setId if provided,
// automatically associating the song with the set's act and adding it to the set
export const CreateSongForm = ({ actId, setId }: { actId?: string, setId?: string }) => {
  return (
    <details className="group">
      <summary className="list-none flex gap-8 items-center p-20 bg-surface rounded-md marker:content-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-18 h-18 transition-all duration-[0.15s] ease-in text-foreground-muted group-open:hidden cursor-pointer hover:opacity-60"
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-18 h-18 lucide lucide-circle-minus-icon lucide-circle-minus group-open:block hidden cursor-pointer transition-all hover:opacity-60 duration-[0.15s] ease-in"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
        </svg>

        <p className="font-bold text-lg text-foreground-muted group-open:text-foreground">ADD SONG</p>
      </summary>

      <section className="flex flex-col gap-20 rounded-b-md bg-surface p-20">
        <Form action={postSongAction.bind(null, actId ?? '', setId ?? '')} className="flex flex-col gap-20">
          {setId && <input hidden={true} name="setId" value={setId} readOnly />}
          {actId && <input hidden={true} name="actId" value={actId} readOnly />}

          <div>
            <label htmlFor="title" className="text-foreground-muted">Title</label>
            <input id="title" name="title" type="text" required spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" />
          </div>

          <div>
            <label htmlFor="description" className="text-foreground-muted">Description (optional)</label>
            <input id="description" name="description" type="text" spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" />
          </div>

          <div>
            <label htmlFor="genre" className="text-foreground-muted">Genre (optional)</label>
            <input id="genre" name="genre" type="text" spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" />
          </div>

          <div>
            <label htmlFor="tempo" className="text-foreground-muted">Tempo (optional)</label>
            <input id="tempo" name="tempo" type="text" spellCheck={false} autoComplete="off" className="block h-44 border-b-1 border-foreground-muted" />
          </div>

          <FormSubmitButton className="text-surface w-[50%]">CREATE</FormSubmitButton>
        </Form>
      </section>
    </details>
  )
}