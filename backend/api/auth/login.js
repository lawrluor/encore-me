const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const { findUserByEmail } = require('../../db/users');

async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return sendError(res, 'Method not allowed', 405);
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    const { password: _, ...userWithoutPassword } = user;

    return sendSuccess(res, {
      token,
      user: userWithoutPassword
    }, 'Login successful');
  } catch (error) {
    console.error('Login API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
