const { sql } = require('./client');
const QRCode = require('qrcode');

const generateQrCode = async (text) => {
  const svg = await QRCode.toString(text, {
    type: 'svg',
    color: {
      dark: '#000000',
      light: '#00000000',
    },
    margin: 1
  });

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

const createUser = async (email, hashedPassword, name = '') => {
  const result = await sql`
    INSERT INTO users (email, password, name)
    VALUES (${email}, ${hashedPassword}, ${name})
    RETURNING id, email, name, created_at, updated_at
  `;

  const newUser = result.rows[0];
  const qrCodeDataUrl = await generateQrCode(newUser.id);

  const updatedResult = await sql`
    UPDATE users
    SET qr_code = ${qrCodeDataUrl}
    WHERE id = ${newUser.id}
    RETURNING id, email, name, qr_code, created_at, updated_at
  `;

  return updatedResult.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await sql`
    SELECT 
      u.id, 
      u.email, 
      u.name, 
      u.is_admin, 
      u.created_at, 
      u.updated_at,
      u.qr_code,
      s.id as promoted_set_id,
      s.title as promoted_set_title,
      s.description as promoted_set_description,
      s.act_id as promoted_set_act_id,
      s.created_at as promoted_set_created_at,
      s.updated_at as promoted_set_updated_at
    FROM users u
    LEFT JOIN sets s ON u.promoted_set_id = s.id
    WHERE u.id = ${id}
  `;

  const user = result.rows[0];
  if (!user) return null;

  // Restructure to nest promoted set data
  const {
    promoted_set_id,
    promoted_set_title,
    promoted_set_description,
    promoted_set_act_id,
    promoted_set_created_at,
    promoted_set_updated_at,
    ...userData
  } = user;

  return {
    ...userData,
    promoted_set: promoted_set_id ? {
      id: promoted_set_id,
      title: promoted_set_title,
      description: promoted_set_description,
      act_id: promoted_set_act_id,
      created_at: promoted_set_created_at,
      updated_at: promoted_set_updated_at
    } : null
  };
};

const getAllUsers = async () => {
  const result = await sql`
    SELECT id, email, name, promoted_set_id, qr_code, created_at, updated_at 
    FROM users 
    ORDER BY created_at DESC
  `;
  return result.rows;
};

const updateUser = async (id, updates) => {
  const { email, name } = updates;
  const result = await sql`
    UPDATE users 
    SET 
      email = COALESCE(${email}, email),
      name = COALESCE(${name}, name),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, name, promoted_set_id, qr_code, created_at, updated_at
  `;
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await sql`
    DELETE FROM users WHERE id = ${id}
    RETURNING id
  `;
  return result.rows[0];
};

const deleteAllUsers = async () => {
  const result = await sql`
    DELETE FROM users
    RETURNING id
  `;
  return result.rows;
};

const updatePromotedSet = async (userId, setId) => {
  const result = await sql`
    UPDATE users 
    SET 
      promoted_set_id = ${setId},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}
    RETURNING id, email, name, promoted_set_id, qr_code, created_at, updated_at
  `;
  return result.rows[0];
};

const updateUserQrCode = async (userId, text) => {
  const qrCodeDataUrl = await generateQrCode(text);
  const result = await sql`
    UPDATE users
    SET qr_code = ${qrCodeDataUrl},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}
    RETURNING id, email, name, qr_code, created_at, updated_at
  `;
  return result.rows[0];
};

const getUserTree = async (userId) => {
  const result = await sql`
    WITH user_acts_data AS (
      SELECT 
        ua.user_id,
        a.id as act_id,
        a.name as act_name,
        a.description as act_description,
        a.created_at as act_created_at,
        a.updated_at as act_updated_at,
        ua.role as user_role
      FROM user_acts ua
      INNER JOIN acts a ON ua.act_id = a.id
      WHERE ua.user_id = ${userId}
    ),
    act_sets_data AS (
      SELECT 
        s.act_id,
        s.id as set_id,
        s.title as set_title,
        s.description as set_description,
        s.created_at as set_created_at,
        s.updated_at as set_updated_at
      FROM sets s
      WHERE s.act_id IN (SELECT act_id FROM user_acts_data)
    ),
    set_songs_data AS (
      SELECT 
        ss.set_id,
        s.id as song_id,
        s.title as song_title,
        s.description as song_description,
        s.genre as song_genre,
        s.tempo as song_tempo,
        s.user_id as song_user_id,
        s.act_id as song_act_id,
        s.created_at as song_created_at,
        s.updated_at as song_updated_at,
        ss.position as song_position
      FROM set_songs ss
      INNER JOIN songs s ON ss.song_id = s.id
      WHERE ss.set_id IN (SELECT set_id FROM act_sets_data)
      ORDER BY ss.position ASC, ss.added_at ASC
    ),
    act_songs_data AS (
      SELECT 
        s.act_id,
        s.id as song_id,
        s.title as song_title,
        s.description as song_description,
        s.genre as song_genre,
        s.tempo as song_tempo,
        s.user_id as song_user_id,
        s.created_at as song_created_at,
        s.updated_at as song_updated_at
      FROM songs s
      WHERE s.act_id IN (SELECT act_id FROM user_acts_data)
      ORDER BY s.created_at DESC
    )
    SELECT 
      u.id,
      u.email,
      u.name,
      u.is_admin,
      u.qr_code,
      u.promoted_set_id,
      u.created_at,
      u.updated_at,
      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', uad.act_id,
            'name', uad.act_name,
            'description', uad.act_description,
            'role', uad.user_role,
            'created_at', uad.act_created_at,
            'updated_at', uad.act_updated_at,
            'sets', (
              SELECT COALESCE(json_agg(
                jsonb_build_object(
                  'id', asd.set_id,
                  'title', asd.set_title,
                  'description', asd.set_description,
                  'created_at', asd.set_created_at,
                  'updated_at', asd.set_updated_at,
                  'songs', (
                    SELECT COALESCE(json_agg(
                      jsonb_build_object(
                        'id', ssd.song_id,
                        'title', ssd.song_title,
                        'description', ssd.song_description,
                        'genre', ssd.song_genre,
                        'tempo', ssd.song_tempo,
                        'user_id', ssd.song_user_id,
                        'act_id', ssd.song_act_id,
                        'position', ssd.song_position,
                        'created_at', ssd.song_created_at,
                        'updated_at', ssd.song_updated_at
                      ) ORDER BY ssd.song_position ASC
                    ), '[]'::json)
                    FROM set_songs_data ssd
                    WHERE ssd.set_id = asd.set_id
                  )
                ) ORDER BY asd.set_created_at DESC
              ), '[]'::json)
              FROM act_sets_data asd
              WHERE asd.act_id = uad.act_id
            ),
            'songs', (
              SELECT COALESCE(json_agg(
                jsonb_build_object(
                  'id', asd2.song_id,
                  'title', asd2.song_title,
                  'description', asd2.song_description,
                  'genre', asd2.song_genre,
                  'tempo', asd2.song_tempo,
                  'user_id', asd2.song_user_id,
                  'created_at', asd2.song_created_at,
                  'updated_at', asd2.song_updated_at
                ) ORDER BY asd2.song_created_at DESC
              ), '[]'::json)
              FROM act_songs_data asd2
              WHERE asd2.act_id = uad.act_id
            )
          )
        ) FILTER (WHERE uad.act_id IS NOT NULL),
        '[]'::json
      ) as acts
    FROM users u
    LEFT JOIN user_acts_data uad ON u.id = uad.user_id
    WHERE u.id = ${userId}
    GROUP BY u.id, u.email, u.name, u.is_admin, u.qr_code, u.promoted_set_id, u.created_at, u.updated_at
  `;

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
  updatePromotedSet,
  updateUserQrCode,
  getUserTree
};
