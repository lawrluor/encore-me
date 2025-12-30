const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');

const items = [];

async function handler(req, res) {
  const user = authenticateRequest(req, res);

  if (!user) {
    return sendError(res, 'Unauthorized', 401);
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    const item = items.find(i => i.id === id && i.userId === user.userId);

    if (!item) {
      return sendError(res, 'Item not found', 404);
    }

    return sendSuccess(res, item);
  }

  if (req.method === 'PUT') {
    const itemIndex = items.findIndex(i => i.id === id && i.userId === user.userId);

    if (itemIndex === -1) {
      return sendError(res, 'Item not found', 404);
    }

    const { title, description, status } = req.body;

    if (title) items[itemIndex].title = title;
    if (description !== undefined) items[itemIndex].description = description;
    if (status) items[itemIndex].status = status;
    items[itemIndex].updatedAt = new Date().toISOString();

    return sendSuccess(res, items[itemIndex], 'Item updated successfully');
  }

  if (req.method === 'DELETE') {
    const itemIndex = items.findIndex(i => i.id === id && i.userId === user.userId);

    if (itemIndex === -1) {
      return sendError(res, 'Item not found', 404);
    }

    items.splice(itemIndex, 1);
    return sendSuccess(res, null, 'Item deleted successfully');
  }

  return sendError(res, 'Method not allowed', 405);
}

module.exports = allowCors(handler);
