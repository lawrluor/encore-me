const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');

const users = [];

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = users.find(u => u.id === id);

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const { password, ...userWithoutPassword } = user;
    return sendSuccess(res, userWithoutPassword);
  }

  if (req.method === 'PUT') {
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return sendError(res, 'User not found', 404);
    }

    const { email, name } = req.body;

    if (email) users[userIndex].email = email;
    if (name) users[userIndex].name = name;
    users[userIndex].updatedAt = new Date().toISOString();

    const { password, ...userWithoutPassword } = users[userIndex];
    return sendSuccess(res, userWithoutPassword, 'User updated successfully');
  }

  if (req.method === 'DELETE') {
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return sendError(res, 'User not found', 404);
    }

    users.splice(userIndex, 1);
    return sendSuccess(res, null, 'User deleted successfully');
  }

  return sendError(res, 'Method not allowed', 405);
}

module.exports = allowCors(handler);
