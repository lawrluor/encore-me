const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { requireAdmin } = require('../utils/adminAuth');
const { deleteAllSets } = require('../../db/sets');

async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      return sendError(res, 'Method not allowed', 405);
    }

    const admin = await requireAdmin(req, res);

    if (!admin) {
      return sendError(res, 'Forbidden: Admin access required', 403);
    }

    const deletedSets = await deleteAllSets();
    return sendSuccess(res, deletedSets, `${deletedSets.length} sets deleted successfully`);
  } catch (error) {
    console.error('Delete all sets API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
