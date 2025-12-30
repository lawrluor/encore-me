const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { findItemById, updateItem, deleteItem } = require('../../db/items');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const { id } = req.query;

    if (req.method === 'GET') {
      const item = await findItemById(id, user.userId);

      if (!item) {
        return sendError(res, 'Item not found', 404);
      }

      return sendSuccess(res, item);
    }

    if (req.method === 'PUT') {
      const { title, description, status } = req.body;
      const updatedItem = await updateItem(id, user.userId, { title, description, status });

      if (!updatedItem) {
        return sendError(res, 'Item not found', 404);
      }

      return sendSuccess(res, updatedItem, 'Item updated successfully');
    }

    if (req.method === 'DELETE') {
      const deletedItem = await deleteItem(id, user.userId);

      if (!deletedItem) {
        return sendError(res, 'Item not found', 404);
      }

      return sendSuccess(res, null, 'Item deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Item by ID API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
