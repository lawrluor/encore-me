const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, setSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { getSetById, updateSet, deleteSet } = require('../../db/sets');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const { id } = req.query;

    if (!id) {
      return sendError(res, 'Set ID is required', 400);
    }

    if (req.method === 'GET') {
      const set = await getSetById(id);

      if (!set) {
        return sendError(res, 'Set not found', 404);
      }

      return sendSuccess(res, set, 'Set retrieved successfully');
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const validation = validateBody(setSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { title, description } = validation.value;
      const updatedSet = await updateSet(id, { title, description });

      if (!updatedSet) {
        return sendError(res, 'Set not found', 404);
      }

      return sendSuccess(res, updatedSet, 'Set updated successfully');
    }

    if (req.method === 'DELETE') {
      const deletedSet = await deleteSet(id);

      if (!deletedSet) {
        return sendError(res, 'Set not found', 404);
      }

      return sendSuccess(res, deletedSet, 'Set deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Set API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
