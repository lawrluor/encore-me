const allowCors = require('./utils/cors');
const { sendSuccess } = require('./utils/response');

async function handler(req, res) {
  if (req.method === 'GET') {
    return sendSuccess(res, {
      message: 'Hello from Vercel Serverless Functions!',
      timestamp: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

module.exports = allowCors(handler);
