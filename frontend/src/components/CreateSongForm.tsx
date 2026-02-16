import Form from 'next/form';

import { postSongAction } from '../actions/songActions';

import { FormSubmitButton } from './FormSubmitter';

// Pass both setId and actId to backend. Backend will prioritize setId if provided,
// automatically associating the song with the set's act and adding it to the set
export const CreateSongForm = ({ actId, setId }: { actId?: string, setId?: string }) => {
  return <section className="flex flex-col gap-20 w-[min(80dvw,380px)]">
    <h2 className="text-2xl">Create Song</h2>
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

      <FormSubmitButton>
        <p>CREATE</p>
      </FormSubmitButton>
    </Form>
  </section>
}