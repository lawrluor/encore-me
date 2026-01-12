const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const QRCode = require('qrcode');

async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return sendError(res, 'Method not allowed', 405);
    }

    const { text } = req.query;

    if (!text) {
      return sendError(res, 'Text parameter is required', 400);
    }

    const qrDataUrl = await QRCode.toDataURL(text);

    return sendSuccess(res, { url: qrDataUrl }, 'QR code generated successfully');
  } catch (error) {
    console.error('QR code API error:', error);
    return sendError(res, 'Error generating QR code', 500);
  }
}

module.exports = allowCors(handler);
