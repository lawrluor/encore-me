const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, setSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createSet, getAllSets, getSetsByActId } = require('../../db/sets');

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const { actId } = req.query || {};

      if (actId) {
        // Get sets for a specific act
        const sets = await getSetsByActId(actId);
        return sendSuccess(res, sets, 'Sets retrieved successfully');
      }

      // Get all sets
      const allSets = await getAllSets();
      return sendSuccess(res, allSets, 'All sets retrieved successfully');
    }

    if (req.method === 'POST') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const validation = validateBody(setSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { actId, title, description } = validation.value;
      const newSet = await createSet(actId, title, description || '');

      return sendSuccess(res, newSet, 'Set created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Sets API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
