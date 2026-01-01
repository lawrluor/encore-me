const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { authenticateRequest } = require('../utils/auth');
const { findSongById, updateSong, deleteSong } = require('../../db/songs');

async function handler(req, res) {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      const song = await findSongById(id, user.userId);

      if (!song) {
        return sendError(res, 'Song not found', 404);
      }

      return sendSuccess(res, song);
    }

    if (req.method === 'PUT') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      // Users can only update their own songs
      const { title, description, genre, tempo } = req.body;
      const updatedSong = await updateSong(id, user.userId, { title, description, genre, tempo });

      if (!updatedSong) {
        return sendError(res, 'Song not found', 404);
      }

      return sendSuccess(res, updatedSong, 'Song updated successfully');
    }

    if (req.method === 'DELETE') {
      const user = authenticateRequest(req, res);

      if (!user) {
        return sendError(res, 'Unauthorized', 401);
      }

      // Users can only delete their own songs
      const deletedSong = await deleteSong(id, user.userId);

      if (!deletedSong) {
        return sendError(res, 'Song not found', 404);
      }

      return sendSuccess(res, null, 'Song deleted successfully');
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Song by ID API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
