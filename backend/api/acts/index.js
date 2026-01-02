const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, actSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createAct, getAllActs, getActsByUserId, addUserToAct } = require('../../db/acts');

async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      // Check if requesting all acts (admin function)
      const { all } = req.query || {};

      if (all === 'true') {
        // Get all acts (admin function)
        const allActs = await getAllActs();
        return sendSuccess(res, allActs, 'All acts retrieved successfully');
      }

      // Get acts for the authenticated user
      const userActs = await getActsByUserId(user.userId);
      return sendSuccess(res, userActs, 'Acts retrieved successfully');
    }

    if (req.method === 'POST') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const validation = validateBody(actSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { title, description } = validation.value;
      const newAct = await createAct(title, description || '');

      // Automatically add the creator as a member with 'creator' role
      await addUserToAct(user.userId, newAct.id, 'creator');

      return sendSuccess(res, newAct, 'Act created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Acts API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
