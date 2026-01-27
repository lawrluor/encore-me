const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { getUserTree } = require('../../db/users');

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return sendError(res, 'Method not allowed', 405);
    }

    const { id } = req.query;

    if (!id) {
      return sendError(res, 'User ID is required', 400);
    }

    const userTree = await getUserTree(id);

    if (!userTree) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, userTree, 'User tree retrieved successfully');
  } catch (error) {
    console.error('User tree API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
