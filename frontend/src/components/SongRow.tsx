
import { postSongAction, updateSongAction } from '../actions/songActions';
import { type Song } from '../types/song';

import { Button } from './Button';

type Props = {
  actId: string;
  setId: string;
  song: Song;
  createMode?: boolean;
}

export const SongRow = ({ actId, setId, song, createMode = false }: Props) => {
  return (
    <form className="contents" action={createMode ? postSongAction.bind(null, actId, setId) : updateSongAction.bind(null, song.id)}>
      <div className="flex items-center gap-10">
        <div className="h-44 w-44 bg-gray-800 rounded-md shrink-0"></div>
        <div className="shrink-0">
          <label htmlFor={`${song.title}-title`} className="sr-only">Title</label>
          <input
            id={`${song.title}-title`}
            type="text"
            name="title"
            defaultValue={song.title}
            placeholder={createMode ? "New song title" : ""}
            className="block bg-transparent placeholder:text-foreground-muted/50"
            required
          />

          <label htmlFor={`${song.title}-description`} className="sr-only">Description</label>
          <input
            id={`${song.title}-description`}
            type="text"
            name="description"
            defaultValue={song.description}
            placeholder={createMode ? "Description" : ""}
            className="block text-sm text-foreground-muted bg-transparent placeholder:text-foreground-muted/50"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${song.title}-genre`} className="sr-only">Genre</label>
        <input
          id={`${song.title}-genre`}
          type="text"
          name="genre"
          defaultValue={song.genre}
          placeholder={createMode ? "Genre" : ""}
          className="block bg-transparent placeholder:text-foreground-muted/50"
        />
      </div>
      <div>
        <label htmlFor={`${song.title}-tempo`} className="sr-only">Tempo</label>
        <input
          id={`${song.title}-tempo`}
          type="text"
          name="tempo"
          defaultValue={song.tempo}
          placeholder={createMode ? "Tempo" : ""}
          className="block bg-transparent placeholder:text-foreground-muted/50"
        />
      </div>

      {createMode
        ?
        <Button type="submit" className="sr-only">Create Song</Button>
        :
        <Button type="submit" className="sr-only">Update Song</Button>
      }
    </form>
  )
}
