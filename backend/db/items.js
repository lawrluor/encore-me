const { sql } = require('./client');
const { ensureTablesExist } = require('./auto-init');

const createItem = async (userId, title, description = '', status = 'active') => {
  await ensureTablesExist();
  const result = await sql`
    INSERT INTO items (user_id, title, description, status)
    VALUES (${userId}, ${title}, ${description}, ${status})
    RETURNING *
  `;
  return result.rows[0];
};

const findItemById = async (id, userId) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT * FROM items 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return result.rows[0];
};

const getItemsByUserId = async (userId) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT * FROM items 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const updateItem = async (id, userId, updates) => {
  await ensureTablesExist();
  const { title, description, status } = updates;
  const result = await sql`
    UPDATE items 
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      status = COALESCE(${status}, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteItem = async (id, userId) => {
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM items 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllItems = async () => {
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM items
    RETURNING id
  `;
  return result.rows;
};

module.exports = {
  createItem,
  findItemById,
  getItemsByUserId,
  updateItem,
  deleteItem,
  deleteAllItems
};
