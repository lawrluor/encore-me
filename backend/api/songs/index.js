const allowCors = require('../utils/cors');
const { sendSuccess, sendError } = require('../utils/response');
const { validateBody, songSchema } = require('../utils/validation');
const { authenticateRequest } = require('../utils/auth');
const { createSong, getSongsByUserId, getSongsByActId, getSongsBySetId } = require('../../db/songs');
const { isUserMemberOfAct } = require('../../db/acts');
const { findSetById } = require('../../db/sets');

async function handler(req, res) {
  try {
    const user = authenticateRequest(req, res);

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (req.method === 'GET') {
      const { actId, setId } = req.query || {};

      // Query by actId
      if (actId) {
        const isMember = await isUserMemberOfAct(user.userId, actId);
        if (!isMember) {
          return sendError(res, 'Forbidden: You must be a member of this act', 403);
        }
        const actSongs = await getSongsByActId(actId);
        return sendSuccess(res, actSongs, 'Songs retrieved successfully');
      }

      // Query by setId
      if (setId) {
        const set = await findSetById(setId);
        if (!set) {
          return sendError(res, 'Set not found', 404);
        }
        const isMember = await isUserMemberOfAct(user.userId, set.act_id);
        if (!isMember) {
          return sendError(res, 'Forbidden: You must be a member of the act that owns this set', 403);
        }
        const setSongs = await getSongsBySetId(setId);
        return sendSuccess(res, setSongs, 'Songs retrieved successfully');
      }

      // Default: query by userId
      const userSongs = await getSongsByUserId(user.userId);
      return sendSuccess(res, userSongs, 'Songs retrieved successfully');
    }

    if (req.method === 'POST') {
      const validation = validateBody(songSchema, req.body);

      if (!validation.valid) {
        return sendError(res, 'Validation failed', 400, validation.errors);
      }

      const { actId, title, description, genre, tempo } = validation.value;

      // Verify user is member of act if actId provided
      if (actId) {
        const isMember = await isUserMemberOfAct(user.userId, actId);
        if (!isMember) {
          return sendError(res, 'Forbidden: You must be a member of this act', 403);
        }
      }

      const newSong = await createSong(user.userId, actId || null, title, description || '', genre || '', tempo || '');

      return sendSuccess(res, newSong, 'Song created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Songs API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
