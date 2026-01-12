# Vercel Serverless Backend API

A complete backend API built with Vercel Serverless Functions, featuring authentication, CRUD operations, and best practices.

## Features

- ✅ RESTful API endpoints
- ✅ **Vercel Postgres database** for persistent storage
- ✅ JWT authentication
- ✅ Request validation with Joi
- ✅ CORS enabled
- ✅ Password hashing with bcrypt
- ✅ Modular utility functions
- ✅ Error handling
- ✅ Interactive API dashboard

## Project Structure

```
.
├── api/
│   ├── auth/
│   │   └── login.js          # Login endpoint
│   ├── users/
│   │   ├── index.js          # Get all users, create user
│   │   └── [id].js           # Get, update, delete user by ID
│   ├── songs/
│   │   ├── index.js          # Get all songs, create song (protected)
│   │   └── [id].js           # Get, update, delete song by ID (protected)
│   ├── acts/
│   │   ├── index.js          # Get all acts, create act (protected)
│   │   ├── [id].js           # Get, update, delete act by ID (protected)
│   │   └── members.js        # Manage act members (protected)
│   ├── utils/
│   │   ├── auth.js           # JWT utilities
│   │   ├── cors.js           # CORS middleware
│   │   ├── response.js       # Response helpers
│   │   └── validation.js     # Joi validation schemas
│   └── hello.js              # Simple hello endpoint
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── vercel.json               # Vercel configuration
└── README.md
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel Postgres Database

**See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.**

Quick steps:
1. Create a Postgres database in your [Vercel Dashboard](https://vercel.com/dashboard)
2. Connect it to your project
3. Environment variables will be automatically added

For local development:
```bash
vercel env pull .env.local
```

### 3. Configure Environment Variables

Create a `.env` file and add your JWT secret:

```bash
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### 4. Install Vercel CLI

```bash
npm install -g vercel
```

### 5. Run Locally

```bash
npm run dev
```

Your API will be available at:
- **Dashboard**: `http://localhost:3000`
- **API**: `http://localhost:3000/api/*`

## Quick Start Guide

### Getting Your First JWT Token

Follow these steps to create a user and get an authentication token:

**Step 1: Create a User**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "securepassword123",
    "name": "Demo User"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "demo@example.com",
    "name": "Demo User",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Step 2: Login to Get JWT Token**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJpYXQiOjE3MDQwNjcyMDAsImV4cCI6MTcwNDE1MzYwMH0.abc123...",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "demo@example.com",
      "name": "Demo User"
    }
  }
}
```

**Step 3: Use the Token for Protected Endpoints**
```bash
# Copy the token from the login response
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Create a song (protected endpoint)
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My First Song",
    "description": "This is a test song",
    "genre": "Rock",
    "tempo": "Fast"
  }'
```

**Or Use the Interactive Dashboard:**
1. Visit `http://localhost:3000`
2. Click "Test" on the "Create User" endpoint
3. Click "Test" on the "Login" endpoint
4. Copy the token from the response
5. Paste it in the "Authorization Token" field for protected endpoints

## API Endpoints

### Public Endpoints

#### Hello World
```
GET /api/hello
```

Response:
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "message": "Hello from Vercel Serverless Functions!",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create User
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

### Protected Endpoints (Require Authentication)

All protected endpoints require an `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

#### Songs

**Get All Songs**
```
GET /api/songs
Authorization: Bearer <token>
```

**Create Song**
```
POST /api/songs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Song",
  "description": "Song description",
  "genre": "Rock",
  "tempo": "Fast"
}
```

**Get Song by ID**
```
GET /api/songs/{id}
Authorization: Bearer <token>
```

**Update Song**
```
PUT /api/songs/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "genre": "Jazz",
  "tempo": "Moderate"
}
```

**Delete Song**
```
DELETE /api/songs/{id}
Authorization: Bearer <token>
```

#### Acts

**Get All Acts**
```
GET /api/acts
Authorization: Bearer <token>
```

**Create Act**
```
POST /api/acts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Beatles",
  "description": "Legendary rock band"
}
```

**Get Act by ID (with members)**
```
GET /api/acts/{id}
Authorization: Bearer <token>
```

**Update Act**
```
PUT /api/acts/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Band Name",
  "description": "Updated description"
}
```

**Delete Act**
```
DELETE /api/acts/{id}
Authorization: Bearer <token>
```

**Add Member to Act**
```
POST /api/acts/{id}/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-uuid-here",
  "role": "Lead Vocalist"
}
```

#### Users

**Get All Users**
```
GET /api/users
```

**Get User by ID**
```
GET /api/users/{id}
```

**Update User**
```
PUT /api/users/{id}
Content-Type: application/json

{
  "email": "newemail@example.com",
  "name": "New Name"
}
```

**Delete User**
```
DELETE /api/users/{id}
```

#### QR Code Generation

**Generate QR Code**
```
GET /api/qr?text=<text_to_encode>
```

Query Parameters:
- `text` (required): The text or URL to encode in the QR code

Response:
```json
{
  "success": true,
  "message": "QR code generated successfully",
  "data": {
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

Example:
```bash
curl "http://localhost:4200/api/qr?text=https://example.com"
```

The endpoint returns a base64-encoded data URL that can be directly used in an `<img>` tag:
```html
<img src="data:image/png;base64,..." alt="QR Code" />
```

## Deployment

### Deploy to Vercel

1. Login to Vercel:
```bash
vercel login
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard or via CLI:
```bash
vercel env add JWT_SECRET
vercel env add DATABASE_URL
```

### Environment Variables in Vercel

Go to your project settings in Vercel dashboard:
1. Navigate to Settings → Environment Variables
2. Add all variables from `.env.example`
3. Redeploy for changes to take effect

## Utilities

### Response Helpers (`api/utils/response.js`)

```javascript
const { sendSuccess, sendError } = require('./utils/response');

// Success response
sendSuccess(res, data, 'Custom message', 200);

// Error response
sendError(res, 'Error message', 400, errors);
```

### Authentication (`api/utils/auth.js`)

```javascript
const { generateToken, verifyToken, authenticateRequest } = require('./utils/auth');

// Generate JWT token
const token = generateToken({ userId: '123' }, '24h');

// Verify token
const payload = verifyToken(token);

// Authenticate request
const user = authenticateRequest(req, res);
```

### Validation (`api/utils/validation.js`)

```javascript
const { validateBody, userSchema, songSchema, actSchema } = require('./utils/validation');

const validation = validateBody(songSchema, req.body);
if (!validation.valid) {
  return sendError(res, 'Validation failed', 400, validation.errors);
}
```

### CORS (`api/utils/cors.js`)

```javascript
const allowCors = require('./utils/cors');

async function handler(req, res) {
  // Your handler logic
}

module.exports = allowCors(handler);
```

## Testing with cURL

### Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create a song (with token):
```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My First Song","description":"This is a test song","genre":"Rock","tempo":"Fast"}'
```

## Database

This API uses **Vercel Postgres** for persistent data storage. All data is stored in a production-ready PostgreSQL database with:
- ✅ Automatic connection pooling
- ✅ SSL encryption
- ✅ Daily backups
- ✅ Auto-scaling

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for setup instructions.

## Interactive Dashboard

Visit `http://localhost:3000` (or your deployed URL) to access the interactive API dashboard where you can:
- 📖 View all API endpoints
- 🧪 Test endpoints with custom requests
- 🔐 Add JWT tokens for protected routes
- 📊 See request/response examples

## Notes

- **Security**: Always use strong JWT secrets and HTTPS in production
- **Rate Limiting**: Consider adding rate limiting for production use
- **Logging**: Add proper logging for debugging and monitoring

## Next Steps

1. **Add Tests**: Write unit and integration tests with Jest
2. **Add Rate Limiting**: Implement rate limiting middleware
3. **Add Logging**: Use a logging service like LogRocket or Sentry
4. **Add Monitoring**: Set up error tracking with Sentry
5. **Add API Versioning**: Implement versioning for breaking changes

## License

MIT
