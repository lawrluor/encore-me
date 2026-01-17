const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { updatePromotedSet } = require('../../db/users');
const { findSetById } = require('../../db/sets');
const { sql } = require('../../db/client');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { setId } = req.body;

      if (!setId) {
        return sendError(res, 'Set ID is required', 400);
      }

      // Verify the set exists
      const set = await findSetById(setId);
      if (!set) {
        return sendError(res, 'Set not found', 404);
      }

      console.log('DEBUG - User from JWT:', user);
      console.log('DEBUG - Set:', set);

      // Verify the user has access to this set (through their acts)
      const userHasAccess = await sql`
        SELECT 1 
        FROM user_acts ua
        INNER JOIN sets s ON s.act_id = ua.act_id
        WHERE ua.user_id = ${user.userId} AND s.id = ${setId}
      `;

      console.log('DEBUG - Access check result:', userHasAccess.rows);
      console.log('DEBUG - Checking user.userId:', user.userId, 'against setId:', setId);

      if (userHasAccess.rows.length === 0) {
        return sendError(res, 'You do not have access to this set', 403);
      }

      // Update the promoted set
      const updatedUser = await updatePromotedSet(user.userId, setId);
      return sendSuccess(res, updatedUser, 'Promoted set updated successfully');
    }

    if (req.method === 'DELETE') {
      // Clear the promoted set
      const updatedUser = await updatePromotedSet(user.userId, null);
      return sendSuccess(res, updatedUser, 'Promoted set cleared successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Promoted set API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
