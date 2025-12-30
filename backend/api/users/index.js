const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, userSchema } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const { createUser, getAllUsers, findUserByEmail } = require('../../db/users');

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const users = await getAllUsers();
      return sendSuccess(res, users, 'Users retrieved successfully');
    }

    if (req.method === 'POST') {
      const validation = validateBody(userSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { email, password, name } = validation.value;

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return sendError(res, 'User already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(email, hashedPassword, name || '');

      return sendSuccess(res, newUser, 'User created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Users API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
