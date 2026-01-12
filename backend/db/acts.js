const { sql } = require('./client');
const QRCode = require('qrcode');

const createAct = async (title, description = '') => {
  // First insert the act to get the ID
  const result = await sql`
    INSERT INTO acts (title, description)
    VALUES (${title}, ${description})
    RETURNING *
  `;

  const newAct = result.rows[0];

  // Generate QR code with the act ID
  const qrCodeDataUrl = await QRCode.toDataURL(newAct.id);

  // Update the act with the QR code
  const updatedResult = await sql`
    UPDATE acts
    SET qr_code = ${qrCodeDataUrl}
    WHERE id = ${newAct.id}
    RETURNING *
  `;

  return updatedResult.rows[0];
};

const findActById = async (id) => {
  const result = await sql`
    SELECT * FROM acts 
    WHERE id = ${id}
  `;
  return result.rows[0];
};

const getAllActs = async () => {
  const result = await sql`
    SELECT * FROM acts 
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const getActsByUserId = async (userId) => {
  const result = await sql`
    SELECT a.*, ua.role, ua.joined_at
    FROM acts a
    INNER JOIN user_acts ua ON a.id = ua.act_id
    WHERE ua.user_id = ${userId}
    ORDER BY a.created_at DESC
  `;
  return result.rows;
};

const getActMembers = async (actId) => {
  const result = await sql`
    SELECT u.id, u.email, u.name, ua.role, ua.joined_at
    FROM users u
    INNER JOIN user_acts ua ON u.id = ua.user_id
    WHERE ua.act_id = ${actId}
    ORDER BY ua.joined_at ASC
  `;
  return result.rows;
};

const updateAct = async (id, updates) => {
  const { title, description } = updates;
  const result = await sql`
    UPDATE acts 
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteAct = async (id) => {
  const result = await sql`
    DELETE FROM acts 
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
};

const addUserToAct = async (userId, actId, role = '') => {
  const result = await sql`
    INSERT INTO user_acts (user_id, act_id, role)
    VALUES (${userId}, ${actId}, ${role})
    ON CONFLICT (user_id, act_id) 
    DO UPDATE SET role = ${role}
    RETURNING *
  `;
  return result.rows[0];
};

const removeUserFromAct = async (userId, actId) => {
  const result = await sql`
    DELETE FROM user_acts 
    WHERE user_id = ${userId} AND act_id = ${actId}
    RETURNING *
  `;
  return result.rows[0];
};

const deleteAllActs = async () => {
  const result = await sql`
    DELETE FROM acts
    RETURNING *
  `;
  return result.rows;
};

module.exports = {
  createAct,
  findActById,
  getAllActs,
  getActsByUserId,
  getActMembers,
  updateAct,
  deleteAct,
  addUserToAct,
  removeUserFromAct,
  deleteAllActs
};
