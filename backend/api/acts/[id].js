const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { getActById, updateAct, deleteAct, getActMembers } = require('../../db/acts');
const { validateBody, actSchema } = require('../utils/validation');

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const act = await getActById(id);

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

      const validation = validateBody(actSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { name, description } = validation.value;

      const updatedAct = await updateAct(id, { name, description });

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
