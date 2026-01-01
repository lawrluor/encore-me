const { sql } = require('./client');
const { ensureTablesExist } = require('./auto-init');

const createSong = async (userId, title, description = '', genre = '', tempo = '') => {
  await ensureTablesExist();
  const result = await sql`
    INSERT INTO songs (user_id, title, description, genre, tempo)
    VALUES (${userId}, ${title}, ${description}, ${genre}, ${tempo})
    RETURNING *
  `;
  return result.rows[0];
};

const findSongById = async (id, userId) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT * FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return result.rows[0];
};

const getSongsByUserId = async (userId) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT * FROM songs 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const updateSong = async (id, userId, updates) => {
  await ensureTablesExist();
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
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM songs 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllSongs = async () => {
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM songs
    RETURNING id
  `;
  return result.rows;
};

module.exports = {
  createSong,
  findSongById,
  getSongsByUserId,
  updateSong,
  deleteSong,
  deleteAllSongs
};
