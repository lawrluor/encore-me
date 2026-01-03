const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, setlistSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { findSetlistById, updateSetlist, deleteSetlist } = require('../../db/setlists');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const { id } = req.query;

    if (!id) {
      return sendError(res, 'Setlist ID is required', 400);
    }

    if (req.method === 'GET') {
      const setlist = await findSetlistById(id);

      if (!setlist) {
        return sendError(res, 'Setlist not found', 404);
      }

      return sendSuccess(res, setlist, 'Setlist retrieved successfully');
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const validation = validateBody(setlistSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { title, description } = validation.value;
      const updatedSetlist = await updateSetlist(id, { title, description });

      if (!updatedSetlist) {
        return sendError(res, 'Setlist not found', 404);
      }

      return sendSuccess(res, updatedSetlist, 'Setlist updated successfully');
    }

    if (req.method === 'DELETE') {
      const deletedSetlist = await deleteSetlist(id);

      if (!deletedSetlist) {
        return sendError(res, 'Setlist not found', 404);
      }

      return sendSuccess(res, deletedSetlist, 'Setlist deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Setlist API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
