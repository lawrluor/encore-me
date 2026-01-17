const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');

async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return sendError(res, 'Method not allowed', 405);
    }

    // Clear the cookie by setting Max-Age to 0
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', [
      `authToken=; HttpOnly; ${isProduction ? 'Secure;' : ''} SameSite=Strict; Path=/; Max-Age=0`
    ]);

    return sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    console.error('Logout API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
