# Authentication System

A Node.js/Express backend authentication service featuring email/password registration with OTP email verification, JWT-based access & refresh tokens, session tracking, and single-device or all-device logout.

## Features

- **User registration** with hashed passwords (SHA-256)
- **Email OTP verification** on sign-up, sent via Nodemailer
- **Login** with JWT access tokens (15 min) and refresh tokens (7 days) stored as `httpOnly` cookies
- **Session management** — each login creates a session record (IP + user agent) so refresh tokens can be tracked and revoked
- **Token refresh** endpoint to rotate access/refresh tokens
- **Logout** from the current device, or **logout from all devices**
- **Get current user** (`/get-me`) using the access token

## Tech Stack

- [Node.js](https://nodejs.org/) / [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for JWT auth
- [Nodemailer](https://nodemailer.com/) for sending OTP emails (via Gmail OAuth2)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) for reading refresh token cookies
- [morgan](https://www.npmjs.com/package/morgan) for request logging
- [dotenv](https://www.npmjs.com/package/dotenv) for environment configuration

## Project Structure

```
.
├── server.js                   # App entry point — connects DB and starts server
├── src/
│   ├── app.js                  # Express app setup
│   ├── config/
│   │   ├── config.js           # Loads & validates environment variables
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js  # Register, login, refresh, logout, verify-email logic
│   ├── models/
│   │   ├── user.model.js       # User schema
│   │   ├── session.model.js    # Refresh token session schema
│   │   └── otp.model.js        # Email OTP schema
│   ├── routes/
│   │   └── auth.routes.js      # /auth route definitions
│   ├── services/
│   │   └── email.service.js    # Nodemailer email sending
│   └── utils/
│       └── utils.js            # OTP generation & HTML template helpers
├── package.json
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB database (local or Atlas)
- A Google account configured for OAuth2 (for sending OTP emails via Gmail)

### Installation

```bash
git clone https://github.com/mosharib-dev/Authentication-System.git
cd Authentication-System
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_oauth_refresh_token
GOOGLE_USER=your_gmail_address
```

The Google OAuth2 credentials are used by the email service to send OTP verification emails through Gmail.

### Running the App

```bash
npm run dev
```

This runs the server with `nodemon` for auto-reload during development, on the port defined by `PORT` (defaults to `3000`).

## API Endpoints

All routes are prefixed with `/auth` (as registered in `src/app.js`).

| Method | Endpoint            | Description                                  | Auth Required |
|--------|----------------------|-----------------------------------------------|----------------|
| POST   | `/register`          | Register a new user and send an OTP email    | No             |
| POST   | `/verify-email`      | Verify a user's email using the OTP          | No             |
| POST   | `/login`             | Log in and receive an access token           | No             |
| GET    | `/get-me`            | Get the currently authenticated user         | Yes (Bearer access token) |
| GET    | `/refresh-token`     | Rotate access/refresh tokens                 | Yes (refresh token cookie) |
| GET    | `/logout`            | Log out of the current device/session        | Yes (refresh token cookie) |
| GET    | `/logout-all`        | Log out of all devices/sessions              | Yes (refresh token cookie) |

### Example: Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "secret123"}'
```

### Example: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "secret123"}'
```

## License

ISC © [Mohammad Mosharib](https://github.com/mosharib-dev)
