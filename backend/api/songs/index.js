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

      const { actId, setId, title, description, genre, tempo } = validation.value;

      let finalActId = actId;

      // If setId provided, lookup set to get act_id and verify membership
      if (setId) {
        const set = await findSetById(setId);
        if (!set) {
          return sendError(res, 'Set not found', 404);
        }

        // Verify user is member of the act that owns this set
        const isMember = await isUserMemberOfAct(user.userId, set.act_id);
        if (!isMember) {
          return sendError(res, 'Forbidden: You must be a member of the act that owns this set', 403);
        }

        // Use the set's act_id for the song (song belongs to ONE act)
        finalActId = set.act_id;
      } else if (actId) {
        // If only actId provided, verify user is member of act
        const isMember = await isUserMemberOfAct(user.userId, actId);
        if (!isMember) {
          return sendError(res, 'Forbidden: You must be a member of this act', 403);
        }
      }

      // Create song with act_id (song belongs to ONE act)
      const newSong = await createSong(user.userId, finalActId || null, title, description || '', genre || '', tempo || '');

      // If setId provided, add song to set_songs join table (song can belong to MULTIPLE sets)
      if (setId) {
        const { addSongToSet } = require('../../db/songs');
        await addSongToSet(setId, newSong.id);
      }

      return sendSuccess(res, newSong, 'Song created successfully', 201);
    }

    return sendError(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Songs API error:', error);
    return sendError(res, 'Internal server error', 500);
  }
}

module.exports = allowCors(handler);
