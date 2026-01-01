const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { findActById, updateAct, deleteAct, getActMembers } = require('../../db/acts');

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const act = await findActById(id);

      if (!act) {
        return sendError(res, 'Act not found', 404);
      }

      // Get members for this act
      const members = await getActMembers(id);
      act.members = members;

      return sendSuccess(res, act);
    }

    if (req.method === 'PUT') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const { title, description } = req.body;
      const updatedAct = await updateAct(id, { title, description });

      if (!updatedAct) {
        return sendError(res, 'Act not found', 404);
      }

      return sendSuccess(res, updatedAct, 'Act updated successfully');
    }

    if (req.method === 'DELETE') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const deletedAct = await deleteAct(id);

      if (!deletedAct) {
        return sendError(res, 'Act not found', 404);
      }

      return sendSuccess(res, deletedAct, 'Act deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Act by ID API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
