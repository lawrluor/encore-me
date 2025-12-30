const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, itemSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createItem, getItemsByUserId } = require('../../db/items');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (req.method === 'GET') {
      const userItems = await getItemsByUserId(user.userId);
      return sendSuccess(res, userItems, 'Items retrieved successfully');
    }

    if (req.method === 'POST') {
      const validation = validateBody(itemSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { title, description, status } = validation.value;
      const newItem = await createItem(user.userId, title, description || '', status || 'active');

      return sendSuccess(res, newItem, 'Item created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Items API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
