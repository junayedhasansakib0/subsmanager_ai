# SubsManager AI - Backend API

MERN Stack backend for SubsManager AI subscription management platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/subsmanager?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=SubsManager AI <your-email@gmail.com>

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Email Verification Token Expiry (in hours)
EMAIL_VERIFY_EXPIRE=24
```

### 3. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

### 4. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI`

### 5. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── subscription.controller.js
│   └── dashboard.controller.js
├── middleware/
│   └── auth.middleware.js    # JWT authentication
├── models/
│   ├── User.model.js         # User schema
│   └── Subscription.model.js
├── routes/
│   ├── auth.routes.js        # Auth endpoints
│   ├── subscription.routes.js
│   └── dashboard.routes.js
├── services/
│   └── email.service.js      # Email sending
├── utils/
│   └── generateToken.js      # JWT token generation
├── index.js                  # Entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /verify-email/:token` - Verify email address
- `POST /resend-verification` - Resend verification email
- `GET /me` - Get current user (Protected)

### Subscriptions (`/api/v1/subscriptions`)

- Coming in Phase 2

### Dashboard (`/api/v1/dashboard`)

- Coming in Phase 3

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT authentication with expiry
- Email verification required before login
- CORS protection
- Input validation
- Secure token generation

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🧪 Testing Endpoints

Use Postman, Thunder Client, or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🚨 Common Issues

1. **MongoDB Connection Error**: Check your `MONGODB_URI` and IP whitelist
2. **Email Not Sending**: Verify Gmail app password and SMTP settings
3. **JWT Error**: Ensure `JWT_SECRET` is set in `.env`
4. **CORS Error**: Update `FRONTEND_URL` in `.env`

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET` (generate with: `openssl rand -base64 32`)
3. Update `FRONTEND_URL` to production domain
4. Use environment variables on hosting platform (Render, Railway, etc.)

