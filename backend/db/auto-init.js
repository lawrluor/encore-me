require('dotenv').config();
const { sql } = require('@vercel/postgres');
const QRCode = require('qrcode');

const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database tables...');

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        is_admin BOOLEAN DEFAULT FALSE,
        promoted_set_id UUID REFERENCES sets(id) ON DELETE SET NULL,
        qr_code TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS songs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        act_id UUID REFERENCES acts(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        genre VARCHAR(50),
        tempo VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS acts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(200) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS qr_code TEXT
    `;

    await sql`
      ALTER TABLE acts
      DROP COLUMN IF EXISTS qr_code
    `;

    const usersMissingQr = await sql`
      SELECT id
      FROM users
      WHERE qr_code IS NULL
    `;

    for (const user of usersMissingQr.rows) {
      const qrCodeDataUrl = await QRCode.toDataURL(user.id);
      await sql`
        UPDATE users
        SET qr_code = ${qrCodeDataUrl}
        WHERE id = ${user.id}
      `;
    }

    await sql`
      ALTER TABLE songs
      ADD COLUMN IF NOT EXISTS act_id UUID REFERENCES acts(id) ON DELETE CASCADE
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS user_acts (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        act_id UUID NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
        role VARCHAR(100),
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, act_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS sets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        act_id UUID NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS set_songs (
        set_id UUID NOT NULL REFERENCES sets(id) ON DELETE CASCADE,
        song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
        position INTEGER,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (set_id, song_id)
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_promoted_set_id ON users(promoted_set_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_songs_user_id ON songs(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_songs_act_id ON songs(act_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_songs_genre ON songs(genre)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_acts_user_id ON user_acts(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_acts_act_id ON user_acts(act_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sets_act_id ON sets(act_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_set_songs_set_id ON set_songs(set_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_set_songs_song_id ON set_songs(song_id)`;

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Database initialization complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
