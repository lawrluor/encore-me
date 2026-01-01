const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, userActSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { addUserToAct, removeUserFromAct, getActMembers } = require('../../db/acts');

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const members = await getActMembers(id);
      return sendSuccess(res, members, 'Act members retrieved successfully');
    }

    if (req.method === 'POST') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const validation = validateBody(userActSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { userId, role } = validation.value;
      const result = await addUserToAct(userId, id, role || '');

      return sendSuccess(res, result, 'User added to act successfully', 201);
    }

    if (req.method === 'DELETE') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const { userId } = req.body;

      if (!userId) {
        return sendError(res, 'userId is required', 400);
      }

      const result = await removeUserFromAct(userId, id);

      if (!result) {
        return sendError(res, 'User not found in act', 404);
      }

      return sendSuccess(res, result, 'User removed from act successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Act members API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
