const { sql } = require('./client');

const createSetlist = async (actId, title, description = '') => {
  const result = await sql`
    INSERT INTO setlists (act_id, title, description)
    VALUES (${actId}, ${title}, ${description})
    RETURNING *
  `;
  return result.rows[0];
};

const findSetlistById = async (id) => {
  const result = await sql`
    SELECT * FROM setlists 
    WHERE id = ${id}
  `;
  return result.rows[0];
};

const getSetlistsByActId = async (actId) => {
  const result = await sql`
    SELECT * FROM setlists 
    WHERE act_id = ${actId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const getAllSetlists = async () => {
  const result = await sql`
    SELECT s.*, a.title as act_title
    FROM setlists s
    INNER JOIN acts a ON s.act_id = a.id
    ORDER BY s.created_at DESC
  `;
  return result.rows;
};

const updateSetlist = async (id, updates) => {
  const { title, description } = updates;
  const result = await sql`
    UPDATE setlists 
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteSetlist = async (id) => {
  const result = await sql`
    DELETE FROM setlists 
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteAllSetlists = async () => {
  const result = await sql`
    DELETE FROM setlists
    RETURNING id
  `;
  return result.rows;
};

module.exports = {
  createSetlist,
  findSetlistById,
  getSetlistsByActId,
  getAllSetlists,
  updateSetlist,
  deleteSetlist,
  deleteAllSetlists
};
