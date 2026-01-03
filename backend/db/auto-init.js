require('dotenv').config();
const { sql } = require('@vercel/postgres');

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS songs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
        title VARCHAR(200) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
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

    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_songs_user_id ON songs(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_songs_genre ON songs(genre)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_acts_user_id ON user_acts(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_user_acts_act_id ON user_acts(act_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sets_act_id ON sets(act_id)`;

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
