const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, userSchema } = require('../utils/validation');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const users = [];

async function handler(req, res) {
  if (req.method === 'GET') {
    return sendSuccess(res, users, 'Users retrieved successfully');
  }

  if (req.method === 'POST') {
    const validation = validateBody(userSchema, req.body);

    if (!validation.valid) {
      return sendError(res, 'Validation failed', 400, validation.errors);
    }

    const { email, password, name } = validation.value;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return sendError(res, 'User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name: name || '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return sendSuccess(res, userWithoutPassword, 'User created successfully', 201);
  }

  return sendError(res, 'Method not allowed', 405);
}

module.exports = allowCors(handler);
