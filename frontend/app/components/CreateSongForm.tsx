import Form from 'next/form';

import { postSongAction } from '../actions/songActions';

// Pass both setId and actId to backend. Backend will prioritize setId if provided,
// automatically associating the song with the set's act and adding it to the set
export const CreateSongForm = ({ actId, setId }: { actId?: string, setId?: string }) => {
  return <section>
    <h2>Create New Song</h2>
    <Form className="flex flex-col w-200" action={postSongAction}>
      {setId && <input hidden={true} name="setId" value={setId} readOnly />}
      {actId && <input hidden={true} name="actId" value={actId} readOnly />}

      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" spellCheck={false} autoComplete="off" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="description">Description (optional)</label>
      <input id="description" name="description" type="text" spellCheck={false} autoComplete="off" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="genre">Genre (optional)</label>
      <input id="genre" name="genre" type="text" spellCheck={false} autoComplete="off" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="tempo">Tempo (optional)</label>
      <input id="tempo" name="tempo" type="text" spellCheck={false} autoComplete="off" className="h-44 border-1 border-white border-solid" />

      <button type="submit" className="h-44 bg-blue-500">CREATE NEW SONG</button>
    </Form>
  </section>
}