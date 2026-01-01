const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, songSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createSong, getSongsByUserId } = require('../../db/songs');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (req.method === 'GET') {
      const userSongs = await getSongsByUserId(user.userId);
      return sendSuccess(res, userSongs, 'Songs retrieved successfully');
    }

    if (req.method === 'POST') {
      const validation = validateBody(songSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { title, description, genre, tempo } = validation.value;
      const newSong = await createSong(user.userId, title, description || '', genre || '', tempo || '');

      return sendSuccess(res, newSong, 'Song created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Songs API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
