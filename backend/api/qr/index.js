const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const QRCode = require('qrcode');

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return sendError(res, 'Method not allowed', 405);
    }

    const user = authenticateRequest(req, res);
    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    const { text } = req.query;

    if (!text) {
      return sendError(res, 'Text parameter is required', 400);
    }

    const svg = await QRCode.toString(text, {
      type: 'svg',
      color: {
        dark: '#000000',
        light: '#00000000',
      },
      margin: 1
    });

    const qrDataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    return sendSuccess(res, { url: qrDataUrl }, 'QR code generated successfully');
  } catch (error) {
    console.error('QR code API error:', error);
    return sendError(res, 'Error generating QR code', 500);
  }
}

module.exports = allowCors(handler);
