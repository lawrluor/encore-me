
import { deleteSongAction, postSongAction, updateSongAction } from '../actions/songActions';
import { type Song } from '../types/song';

import { Button } from './Button';
import { SongRowOptions } from './SongRowOptions';

type Props = {
  actId: string;
  setId: string;
  song: Song;
  createMode?: boolean;
}

export const SongRow = ({ actId, setId, song, createMode = false }: Props) => {
  return (
    <form className="grid grid-cols-3 gap-10 mb-10 relative">
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
            className="block bg-transparent placeholder:text-foreground-muted/50 border-transparent border-b-1 hover:border-foreground-muted/50 transition-all duration-[0.25s] ease-in"
            required
          />

          <label htmlFor={`${song.title}-description`} className="sr-only">Description</label>
          <input
            id={`${song.title}-description`}
            type="text"
            name="description"
            defaultValue={song.description}
            placeholder={createMode ? "Description" : ""}
            className="block text-sm text-foreground-muted bg-transparent placeholder:text-foreground-muted/50 border-transparent border-b-1 hover:border-foreground-muted/50 transition-all duration-[0.25s] ease-in"
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
          className="block bg-transparent placeholder:text-foreground-muted/50 border-transparent border-b-1 hover:border-b-foreground-muted/50 transition-all duration-[0.25s] ease-in"
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
          className="block bg-transparent placeholder:text-foreground-muted/50 border-transparent border-b-1 hover:border-foreground-muted/50 transition-all duration-[0.25s] ease-in"
        />
      </div>

      <div className="absolute right-0">
        {!createMode && <SongRowOptions songTitle={song.title} deleteAction={deleteSongAction.bind(null, actId, song.id)} />}
      </div>

      {createMode
        ?
        <Button type="submit" formAction={postSongAction.bind(null, actId, setId)} className="sr-only">Create Song</Button>
        :
        <Button type="submit" formAction={updateSongAction.bind(null, song.id)} className="sr-only">Update Song</Button>
      }
    </form>
  )
}
