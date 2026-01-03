const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, setlistSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createSetlist, getAllSetlists, getSetlistsByActId } = require('../../db/setlists');

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const { actId } = req.query || {};

      if (actId) {
        // Get setlists for a specific act
        const setlists = await getSetlistsByActId(actId);
        return sendSuccess(res, setlists, 'Setlists retrieved successfully');
      }

      // Get all setlists
      const allSetlists = await getAllSetlists();
      return sendSuccess(res, allSetlists, 'All setlists retrieved successfully');
    }

    if (req.method === 'POST') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const validation = validateBody(setlistSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { actId, title, description } = validation.value;
      const newSetlist = await createSetlist(actId, title, description || '');

      return sendSuccess(res, newSetlist, 'Setlist created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Setlists API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
