const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { findUserById, updateUser, deleteUser } = require('../../db/users');

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const user = await findUserById(id);

      if (!user) {
        return sendError(res, 'User not found', 404);
      }

      return sendSuccess(res, user);
    }

    if (req.method === 'PUT') {
      const { email, name } = req.body;
      const updatedUser = await updateUser(id, { email, name });

      if (!updatedUser) {
        return sendError(res, 'User not found', 404);
      }

      return sendSuccess(res, updatedUser, 'User updated successfully');
    }

    if (req.method === 'DELETE') {
      const deletedUser = await deleteUser(id);

      if (!deletedUser) {
        return sendError(res, 'User not found', 404);
      }

      return sendSuccess(res, null, 'User deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('User by ID API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
