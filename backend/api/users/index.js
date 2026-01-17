const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, userSchema } = require('../utils/validation');
const { generateToken } = require('../utils/auth');
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
        return sendError(res, `Validation failed: ${JSON.stringify(validation.errors[0].message)}`, 400, validation.errors);
      }

      const { email, password, name } = validation.value;

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return sendError(res, 'User already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(email, hashedPassword, name || '');

      const token = generateToken({
        userId: newUser.id,
        email: newUser.email
      });

      // Set HTTP-only cookie
      const isProduction = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', [
        `authToken=${token}; HttpOnly; ${isProduction ? 'Secure;' : ''} SameSite=Strict; Path=/; Max-Age=604800`
      ]);

      return sendSuccess(res, {
        user: newUser
      }, 'User created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Users API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
