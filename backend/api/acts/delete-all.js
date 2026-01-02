const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { requireAdmin } = require('../utils/adminAuth');
const { deleteAllActs } = require('../../db/acts');

async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      return sendError(res, 'Method not allowed', 405);
    }

    const admin = await requireAdmin(req, res);

    if (!admin) {
      return sendError(res, 'Forbidden: Admin access required', 403);
    }

    const deletedActs = await deleteAllActs();

    return sendSuccess(res, { count: deletedActs.length, acts: deletedActs }, 'All acts deleted successfully');
  } catch (error) {
    console.error('Delete all acts error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
