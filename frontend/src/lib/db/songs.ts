'server only';

import { type Song } from '../../types/song';

import { sql } from './client';

const createSong = async (userId: string, actId: string | null, title: string, description = '', genre = '', tempo = ''): Promise<Song> => {
  const result = await sql`
    INSERT INTO songs (user_id, act_id, title, description, genre, tempo)
    VALUES (${userId}, ${actId}, ${title}, ${description}, ${genre}, ${tempo})
    RETURNING *
  `;
  return result.rows[0] as Song;
};

const findSongById = async (id: string, userId: string): Promise<Song | null> => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return (result.rows[0] as Song) ?? null;
};

const getSongsByUserId = async (userId: string): Promise<Song[]> => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return result.rows as Song[];
};

const getSongsByActId = async (actId: string): Promise<Song[]> => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE act_id = ${actId}
    ORDER BY created_at DESC
  `;
  return result.rows as Song[];
};

const getSongsBySetId = async (setId: string): Promise<Song[]> => {
  const result = await sql`
    SELECT s.*, ss.position, ss.added_at
    FROM songs s
    INNER JOIN set_songs ss ON s.id = ss.song_id
    WHERE ss.set_id = ${setId}
    ORDER BY ss.position ASC, ss.added_at ASC
  `;
  return result.rows as Song[];
};

const updateSong = async (id: string, userId: string, updates: { title?: string; description?: string; genre?: string; tempo?: string }): Promise<Song | null> => {
  const { title, description, genre, tempo } = updates;
  const result = await sql`
    UPDATE songs 
    SET 
      title = COALESCE(${title ?? null}, title),
      description = COALESCE(${description ?? null}, description),
      genre = COALESCE(${genre ?? null}, genre),
      tempo = COALESCE(${tempo ?? null}, tempo),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return (result.rows[0] as Song) ?? null;
};

const deleteSong = async (id: string, userId: string): Promise<{ id: string } | null> => {
  const result = await sql`
    DELETE FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return (result.rows[0] as { id: string }) ?? null;
};

const deleteAllSongs = async (): Promise<{ id: string }[]> => {
  const result = await sql`
    DELETE FROM songs
    RETURNING id
  `;
  return result.rows as { id: string }[];
};

const addSongToSet = async (setId: string, songId: string, position: number | null = null): Promise<{ set_id: string; song_id: string; position: number | null }> => {
  const result = await sql`
    INSERT INTO set_songs (set_id, song_id, position)
    VALUES (${setId}, ${songId}, ${position})
    ON CONFLICT (set_id, song_id) 
    DO UPDATE SET position = ${position}
    RETURNING *
  `;
  return result.rows[0] as { set_id: string; song_id: string; position: number | null };
};

const removeSongFromSet = async (setId: string, songId: string): Promise<{ set_id: string; song_id: string } | null> => {
  const result = await sql`
    DELETE FROM set_songs 
    WHERE set_id = ${setId} AND song_id = ${songId}
    RETURNING *
  `;
  return (result.rows[0] as { set_id: string; song_id: string }) ?? null;
};

export {
  createSong,
  findSongById,
  getSongsByUserId,
  getSongsByActId,
  getSongsBySetId,
  updateSong,
  deleteSong,
  deleteAllSongs,
  addSongToSet,
  removeSongFromSet
};
