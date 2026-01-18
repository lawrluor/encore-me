const { sql } = require('./client');

const createSong = async (userId, actId, title, description = '', genre = '', tempo = '') => {
  const result = await sql`
    INSERT INTO songs (user_id, act_id, title, description, genre, tempo)
    VALUES (${userId}, ${actId}, ${title}, ${description}, ${genre}, ${tempo})
    RETURNING *
  `;
  return result.rows[0];
};

const findSongById = async (id, userId) => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return result.rows[0];
};

const getSongsByUserId = async (userId) => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const getSongsByActId = async (actId) => {
  const result = await sql`
    SELECT * FROM songs 
    WHERE act_id = ${actId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const getSongsBySetId = async (setId) => {
  const result = await sql`
    SELECT s.*, ss.position, ss.added_at
    FROM songs s
    INNER JOIN set_songs ss ON s.id = ss.song_id
    WHERE ss.set_id = ${setId}
    ORDER BY ss.position ASC, ss.added_at ASC
  `;
  return result.rows;
};

const updateSong = async (id, userId, updates) => {
  const { title, description, genre, tempo } = updates;
  const result = await sql`
    UPDATE songs 
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      genre = COALESCE(${genre}, genre),
      tempo = COALESCE(${tempo}, tempo),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteSong = async (id, userId) => {
  const result = await sql`
    DELETE FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllSongs = async () => {
  const result = await sql`
    DELETE FROM songs
    RETURNING id
  `;
  return result.rows;
};

const addSongToSet = async (setId, songId, position = null) => {
  const result = await sql`
    INSERT INTO set_songs (set_id, song_id, position)
    VALUES (${setId}, ${songId}, ${position})
    ON CONFLICT (set_id, song_id) 
    DO UPDATE SET position = ${position}
    RETURNING *
  `;
  return result.rows[0];
};

const removeSongFromSet = async (setId, songId) => {
  const result = await sql`
    DELETE FROM set_songs 
    WHERE set_id = ${setId} AND song_id = ${songId}
    RETURNING *
  `;
  return result.rows[0];
};

module.exports = {
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
