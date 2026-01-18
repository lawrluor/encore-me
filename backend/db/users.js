const { sql } = require('./client');
const QRCode = require('qrcode');

const createUser = async (email, hashedPassword, name = '') => {
  const result = await sql`
    INSERT INTO users (email, password, name)
    VALUES (${email}, ${hashedPassword}, ${name})
    RETURNING id, email, name, created_at, updated_at
  `;

  const newUser = result.rows[0];
  const qrCodeDataUrl = await QRCode.toDataURL(newUser.id);

  const updatedResult = await sql`
    UPDATE users
    SET qr_code = ${qrCodeDataUrl}
    WHERE id = ${newUser.id}
    RETURNING id, email, name, qr_code, created_at, updated_at
  `;

  return updatedResult.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await sql`
    SELECT 
      u.id, 
      u.email, 
      u.name, 
      u.is_admin, 
      u.created_at, 
      u.updated_at,
      u.qr_code,
      s.id as promoted_set_id,
      s.title as promoted_set_title,
      s.description as promoted_set_description,
      s.act_id as promoted_set_act_id,
      s.created_at as promoted_set_created_at,
      s.updated_at as promoted_set_updated_at
    FROM users u
    LEFT JOIN sets s ON u.promoted_set_id = s.id
    WHERE u.id = ${id}
  `;

  const user = result.rows[0];
  if (!user) return null;

  // Restructure to nest promoted set data
  const {
    promoted_set_id,
    promoted_set_title,
    promoted_set_description,
    promoted_set_act_id,
    promoted_set_created_at,
    promoted_set_updated_at,
    ...userData
  } = user;

  return {
    ...userData,
    promoted_set: promoted_set_id ? {
      id: promoted_set_id,
      title: promoted_set_title,
      description: promoted_set_description,
      act_id: promoted_set_act_id,
      created_at: promoted_set_created_at,
      updated_at: promoted_set_updated_at
    } : null
  };
};

const getAllUsers = async () => {
  const result = await sql`
    SELECT id, email, name, promoted_set_id, qr_code, created_at, updated_at 
    FROM users 
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const updateUser = async (id, updates) => {
  const { email, name } = updates;
  const result = await sql`
    UPDATE users 
    SET 
      email = COALESCE(${email}, email),
      name = COALESCE(${name}, name),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, name, promoted_set_id, qr_code, created_at, updated_at
  `;
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await sql`
    DELETE FROM users WHERE id = ${id}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllUsers = async () => {
  const result = await sql`
    DELETE FROM users
    RETURNING id
  `;
  return result.rows;
};

const updatePromotedSet = async (userId, setId) => {
  const result = await sql`
    UPDATE users 
    SET 
      promoted_set_id = ${setId},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}
    RETURNING id, email, name, promoted_set_id, qr_code, created_at, updated_at
  `;
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  updatePromotedSet
};
