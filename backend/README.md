# Vercel Serverless Backend API

A complete backend API built with Vercel Serverless Functions, featuring authentication, CRUD operations, and best practices.

## Features

- ✅ RESTful API endpoints
- ✅ JWT authentication
- ✅ Request validation with Joi
- ✅ CORS enabled
- ✅ Password hashing with bcrypt
- ✅ Modular utility functions
- ✅ Error handling
- ✅ TypeScript-ready structure

## Project Structure

```
.
├── api/
│   ├── auth/
│   │   └── login.js          # Login endpoint
│   ├── users/
│   │   ├── index.js          # Get all users, create user
│   │   └── [id].js           # Get, update, delete user by ID
│   ├── items/
│   │   ├── index.js          # Get all items, create item (protected)
│   │   └── [id].js           # Get, update, delete item by ID (protected)
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

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
NODE_ENV=development
```

### 3. Install Vercel CLI

```bash
npm install -g vercel
```

### 4. Run Locally

```bash
vercel dev
```

Your API will be available at `http://localhost:3000`

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

#### Items

**Get All Items**
```
GET /api/items
Authorization: Bearer <token>
```

**Create Item**
```
POST /api/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Item",
  "description": "Item description",
  "status": "active"
}
```

**Get Item by ID**
```
GET /api/items/{id}
Authorization: Bearer <token>
```

**Update Item**
```
PUT /api/items/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "inactive"
}
```

**Delete Item**
```
DELETE /api/items/{id}
Authorization: Bearer <token>
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
const { validateBody, userSchema, itemSchema } = require('./utils/validation');

const validation = validateBody(userSchema, req.body);
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

### Create an item (with token):
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My First Item","description":"This is a test item","status":"active"}'
```

## Notes

- **In-Memory Storage**: This example uses in-memory arrays for data storage. For production, integrate a database (MongoDB, PostgreSQL, etc.)
- **Security**: Always use strong JWT secrets and HTTPS in production
- **Rate Limiting**: Consider adding rate limiting for production use
- **Logging**: Add proper logging for debugging and monitoring

## Next Steps

1. **Add Database**: Integrate MongoDB, PostgreSQL, or another database
2. **Add Tests**: Write unit and integration tests with Jest
3. **Add Rate Limiting**: Implement rate limiting middleware
4. **Add Logging**: Use a logging service like LogRocket or Sentry
5. **Add Documentation**: Generate API docs with Swagger/OpenAPI

## License

MIT
