const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, itemSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { v4: uuidv4 } = require('uuid');

const items = [];

async function handler(req, res) {
  const user = authenticateRequest(req, res);

  if (!user) {
    return sendError(res, 'Unauthorized', 401);
  }

  if (req.method === 'GET') {
    const userItems = items.filter(item => item.userId === user.userId);
    return sendSuccess(res, userItems, 'Items retrieved successfully');
  }

  if (req.method === 'POST') {
    const validation = validateBody(itemSchema, req.body);

    if (!validation.valid) {
      return sendError(res, 'Validation failed', 400, validation.errors);
    }

    const { title, description, status } = validation.value;

    const newItem = {
      id: uuidv4(),
      userId: user.userId,
      title,
      description: description || '',
      status: status || 'active',
      createdAt: new Date().toISOString()
    };

    items.push(newItem);
    return sendSuccess(res, newItem, 'Item created successfully', 201);
  }

  return sendError(res, 'Method not allowed', 405);
}

module.exports = allowCors(handler);
