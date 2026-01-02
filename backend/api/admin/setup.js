const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { sql } = require('../../db/client');

async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return sendError(res, 'Method not allowed', 405);
    }

    const { email, secret } = req.body;

    // Add a secret key check for security
    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return sendError(res, 'Invalid setup secret', 403);
    }

    if (!email) {
      return sendError(res, 'Email is required', 400);
    }

    const result = await sql`
      UPDATE users 
      SET is_admin = TRUE 
      WHERE email = ${email}
      RETURNING id, email, name, is_admin
    `;

    if (result.rows.length === 0) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, result.rows[0], 'User promoted to admin successfully');
  } catch (error) {
    console.error('Admin setup error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
