const { sql } = require('./client');

const createSet = async (actId, title, description = '') => {
  const result = await sql`
    INSERT INTO sets (act_id, title, description)
    VALUES (${actId}, ${title}, ${description})
    RETURNING *
  `;
  return result.rows[0];
};

const getSetById = async (id) => {
  const result = await sql`
    SELECT * FROM sets 
    WHERE id = ${id}
  `;
  return result.rows[0];
};

const getSetsByActId = async (actId) => {
  const result = await sql`
    SELECT * FROM sets 
    WHERE act_id = ${actId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const getAllSets = async () => {
  const result = await sql`
    SELECT s.*, a.name as act_name
    FROM sets s
    INNER JOIN acts a ON s.act_id = a.id
    ORDER BY s.created_at DESC
  `;
  return result.rows;
};

const updateSet = async (id, updates) => {
  const { title, description } = updates;
  const result = await sql`
    UPDATE sets 
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteSet = async (id) => {
  const result = await sql`
    DELETE FROM sets 
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteAllSets = async () => {
  const result = await sql`
    DELETE FROM sets
    RETURNING id
  `;
  return result.rows;
};

module.exports = {
  createSet,
  getSetById,
  getSetsByActId,
  getAllSets,
  updateSet,
  deleteSet,
  deleteAllSets
};
