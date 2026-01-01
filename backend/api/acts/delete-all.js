const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { deleteAllActs } = require('../../db/acts');

async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      return sendError(res, 'Method not allowed', 405);
    }

    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const deletedActs = await deleteAllActs();

    return sendSuccess(res, { count: deletedActs.length, acts: deletedActs }, 'All acts deleted successfully');
  } catch (error) {
    console.error('Delete all acts error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
