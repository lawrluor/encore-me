const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { deleteAllUsers } = require('../../db/users');

async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      return sendError(res, 'Method not allowed', 405);
    }

    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    // For now, allow any authenticated user to delete all users
    // In production, you might want to add admin role checking
    const deletedUsers = await deleteAllUsers();

    return sendSuccess(res, { deletedCount: deletedUsers.length }, 'All users deleted successfully');
  } catch (error) {
    console.error('Delete all users API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
