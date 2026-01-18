import Form from 'next/form';

import { createSong } from '../services/songService';

export const CreateSongForm = ({ actId }: { actId: string }) => {
  return <section>
    <h2>Create New Song</h2>
    {/*<h3>{actId}</h3>*/}
    <Form className="flex flex-col w-200" action={createSong}>
      <input hidden={true} name="actId" value={actId} readOnly />

      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="description">Description (optional)</label>
      <input id="description" name="description" type="text" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="genre">Genre (optional)</label>
      <input id="genre" name="genre" type="text" className="h-44 border-1 border-white border-solid" />

      <label htmlFor="tempo">Tempo (optional)</label>
      <input id="tempo" name="tempo" type="text" className="h-44 border-1 border-white border-solid" />

      <button type="submit" className="h-44 bg-blue-500">CREATE NEW SONG</button>
    </Form>
  </section>
}