const { sql } = require('./client');
const { ensureTablesExist } = require('./auto-init');

const createUser = async (email, hashedPassword, name = '') => {
  await ensureTablesExist();
  const result = await sql`
    INSERT INTO users (email, password, name)
    VALUES (${email}, ${hashedPassword}, ${name})
    RETURNING id, email, name, created_at
  `;
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result.rows[0];
};

const findUserById = async (id) => {
  await ensureTablesExist();
  const result = await sql`
    SELECT id, email, name, created_at, updated_at 
    FROM users 
    WHERE id = ${id}
  `;
  return result.rows[0];
};

const getAllUsers = async () => {
  await ensureTablesExist();
  const result = await sql`
    SELECT id, email, name, created_at, updated_at 
    FROM users 
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const updateUser = async (id, updates) => {
  await ensureTablesExist();
  const { email, name } = updates;
  const result = await sql`
    UPDATE users 
    SET 
      email = COALESCE(${email}, email),
      name = COALESCE(${name}, name),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, name, created_at, updated_at
  `;
  return result.rows[0];
};

const deleteUser = async (id) => {
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM users WHERE id = ${id}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllUsers = async () => {
  await ensureTablesExist();
  const result = await sql`
    DELETE FROM users
    RETURNING id
  `;
  return result.rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers
};
