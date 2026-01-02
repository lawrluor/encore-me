const { authenticateRequest } = require('./auth');
const { findUserById } = require('../../db/users');

const requireAdmin = async (req, res) => {
  const user = authenticateRequest(req, res);

  if (!user) {
    return null;
  }

  // Fetch full user details to check admin status
  const fullUser = await findUserById(user.userId);

  if (!fullUser || !fullUser.is_admin) {
    return null;
  }

  return fullUser;
};

module.exports = { requireAdmin };
