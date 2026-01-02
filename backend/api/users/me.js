const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { findUserById } = require('../../db/users');

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return sendError(res, 'Method not allowed', 405);
    }

    const decoded = authenticateRequest(req, res);

    if (!decoded) {
      return sendError(res, 'Unauthorized', 401);
    }

    const user = await findUserById(decoded.userId);

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, user, 'User retrieved successfully');
  } catch (error) {
    console.error('Get current user API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
