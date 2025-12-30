# Vercel Postgres Database Setup

This guide will help you set up Vercel Postgres for your backend API.

## Quick Setup

### 1. Create a Vercel Postgres Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose a name for your database (e.g., `encore-me-db`)
6. Select a region close to your users
7. Click **Create**

### 2. Connect Database to Your Project

1. In the Vercel dashboard, go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Vercel will automatically add these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Initialize Database Tables

The database tables will be automatically created on first API call. The schema includes:

**Users Table:**
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Items Table:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id)
- `title` (VARCHAR)
- `description` (TEXT)
- `status` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 4. Local Development

For local development with `vercel dev`:

1. Pull environment variables from Vercel:
   ```bash
   vercel env pull .env.local
   ```

2. This will download all environment variables including database credentials

3. Run your dev server:
   ```bash
   npm run dev
   ```

## Manual Database Initialization (Optional)

If you want to manually initialize the database, you can run the SQL schema:

```bash
# Connect to your database using the Vercel CLI
vercel env pull

# Or use the SQL file directly
psql $POSTGRES_URL < db/schema.sql
```

## Database Functions

The API uses these database utility functions located in `/db`:

- **`db/client.js`** - Database connection and initialization
- **`db/users.js`** - User CRUD operations
- **`db/items.js`** - Item CRUD operations

## Verifying Database Connection

Test your database connection by:

1. Deploy your app: `vercel --prod`
2. Create a test user: `POST /api/users`
3. Check if the user persists across requests

## Troubleshooting

### Error: "relation does not exist"
The tables haven't been created yet. Make a request to any endpoint to trigger auto-initialization.

### Error: "connection refused"
Check that your environment variables are set correctly in Vercel dashboard.

### Error: "password authentication failed"
Pull the latest environment variables: `vercel env pull .env.local`

## Production Considerations

- ✅ **Connection Pooling**: Vercel Postgres uses connection pooling by default
- ✅ **Auto-scaling**: Database scales with your serverless functions
- ✅ **Backups**: Vercel provides automatic daily backups
- ✅ **SSL**: All connections are encrypted

## Monitoring

Monitor your database in the Vercel dashboard:
- Query performance
- Connection usage
- Storage usage
- Error logs

## Cost

Vercel Postgres pricing:
- **Hobby**: Free tier available (limited storage/queries)
- **Pro**: Scales with usage
- Check [Vercel Pricing](https://vercel.com/pricing/storage) for details
