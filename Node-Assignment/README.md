"# E-Commerce Authentication API

A production-ready authentication system built with **SOLID principles** and **JWT + Refresh Token mechanism**. This API provides comprehensive user authentication, authorization, and session management with role-based access control.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture & SOLID Principles](#architecture--solid-principles)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Core Features](#core-features)
- [Token Mechanism](#token-mechanism)
- [Database Schema](#database-schema)
- [All Endpoints](#all-endpoints)

---

## 🎯 Project Overview

This is a **Node.js + Express TypeScript** authentication API designed with **SOLID principles** and production-ready patterns. It implements:

✅ **JWT + Refresh Token mechanism** with token revocation  
✅ **SOLID Principle compliance** (SRP, OCP, LSP, ISP, DIP)  
✅ **Role-based access control** (RBAC)  
✅ **Input validation** using Zod schema validation  
✅ **SQLite database** with TypeORM  
✅ **Comprehensive Swagger documentation** (v3.0.0)  
✅ **Security best practices** (bcrypt hashing, token expiration, token rotation)  
✅ **Clean separation of concerns** (controllers, services, models, schemas)  

---

## 🏗️ Architecture & SOLID Principles

### Single Responsibility Principle (SRP)
Each module has a **single, well-defined responsibility**:
- **Controllers** → Handle HTTP requests/responses
- **Services** → Contain business logic
- **Token Service** → Manage JWT token generation, verification, and revocation
- **Schemas** → Define and validate data structures
- **Middleware** → Handle authentication and authorization
- **Models** → Define database entities

### Open/Closed Principle (OCP)
- **Token Service** is open for extension (new token types can be added)
- **Middleware** can be extended with new guards (roleGuard, permissionGuard, etc.)
- **Services** can be enhanced without modifying existing code

### Liskov Substitution Principle (LSP)
- All middleware follow the **Express middleware interface**
- All error responses follow a **consistent structure**
- Services return consistent, predictable types

### Interface Segregation Principle (ISP)
- **JwtPayload interface** contains only necessary JWT claims
- Controllers receive only the data they need
- Middleware interfaces are specific and focused

### Dependency Inversion Principle (DIP)
- **AppDataSource** is injected into services via config
- Services depend on abstractions (repositories) not concrete implementations
- Token Service provides abstraction for token operations

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | Latest |
| **Language** | TypeScript | ^5.4.5 |
| **Framework** | Express.js | ^4.19.2 |
| **Database** | SQLite + TypeORM | ^0.3.20 |
| **Authentication** | JWT + bcrypt | jsonwebtoken@^9.0.2, bcrypt@^5.1.1 |
| **Validation** | Zod | ^3.23.8 |
| **Documentation** | Swagger/OpenAPI 3.0 | swagger-ui-express@^5.0.1 |
| **Development** | ts-node-dev | ^2.0.0 |

---

## 📁 Project Structure

```
asignment-node-sqLite/
├── src/
│   ├── app.ts                      # Express app configuration
│   ├── config/
│   │   ├── database.ts             # TypeORM database configuration
│   │   └── swagger.ts              # Swagger API documentation (OpenAPI 3.0)
│   ├── controllers/
│   │   └── authController.ts       # Request handlers (SRP)
│   ├── middleware/
│   │   └── authMiddleware.ts       # JWT verification & role guards
│   ├── models/
│   │   ├── User.ts                 # User entity (TypeORM)
│   │   └── RefreshToken.ts         # Refresh token entity (TypeORM)
│   ├── routes/
│   │   └── authRoutes.ts           # API endpoint definitions
│   ├── schemas/
│   │   └── authSchema.ts           # Zod validation schemas
│   └── services/
│       ├── authService.ts          # Authentication business logic
│       └── tokenService.ts         # Token generation & verification (NEW)
├── dist/                           # Compiled JavaScript (generated)
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

**Key Design Pattern**: **Separation of Concerns**
- Each layer has a distinct responsibility
- Easy to test, modify, and extend
- Changes in one layer don't cascade to others

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v16+)
- **npm** (v8+)

### Step 1: Clone/Navigate to Project
```bash
cd "c:\Users\arokiaraj.j\Documents\Node Training\asignment-node-sqLite"
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- Express, TypeORM, JWT, bcrypt
- Zod for validation
- Swagger documentation
- TypeScript dev tools

---

## ▶️ Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```
- Runs TypeScript directly using `ts-node-dev`
- Auto-restarts on file changes
- Perfect for development

### Production Build
```bash
npm run build
```
- Compiles TypeScript to JavaScript
- Output in `dist/` folder
- Run with `npm start`

### Start Production Server
```bash
npm start
```
- Runs compiled JavaScript from `dist/app.js`
- No TypeScript overhead
- For production deployment

---

## 📚 API Documentation

### Interactive Swagger UI
Once the server is running, visit:
```
http://localhost:3000/api-docs
```

**Features**:
- ✅ Try API endpoints directly in browser
- ✅ View complete request/response schemas
- ✅ See all validation rules
- ✅ Copy curl examples
- ✅ Bearer token authentication support

### Swagger Version
- **OpenAPI 3.0.0** (latest standard)
- Fully compliant with modern API specifications
- Includes security schemes, examples, and descriptions

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secrets (Keep them STRONG and SECRET!)
JWT_SECRET=your_super_secret_access_token_key_min_32_chars_!
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_min_32_chars_!

# Session Configuration (Optional - now using JWT)
SESSION_SECRET=your_session_secret_key
```

**Security Notes**:
- ✅ Never commit `.env` to version control
- ✅ Use strong, unique secrets (32+ characters)
- ✅ Different secrets for access & refresh tokens
- ✅ Rotate secrets periodically in production

---

## ⭐ Core Features

### 1. **User Registration**
- Validates email uniqueness
- Strong password requirements (8+ chars, 1 uppercase, 1 number)
- Bcrypt password hashing (12 rounds)
- Returns user profile (without password)

### 2. **Authentication**
- Email/password login
- Issues **access token** (15 minutes expiry)
- Issues **refresh token** (30 days expiry)
- Optional role-based access control

### 3. **Token Management**
- **Access Token Mechanism**: Short-lived, used for API requests
- **Refresh Token Mechanism**: Long-lived, used to obtain new access tokens
- **Token Revocation**: Logout invalidates refresh tokens
- **Token Rotation**: New refresh token issued on each refresh

### 4. **User Profile**
- Retrieve authenticated user details
- Requires valid access token
- Protected endpoint

### 5. **Logout**
- Revokes refresh token
- Prevents token reuse
- Secure session termination

---

## 🔄 Token Mechanism

### Access Token (15 minutes)
```typescript
{
  id: number,
  email: string,
  role: string,
  iat: number,     // issued at
  exp: number      // expires in 15 minutes
}
```
**Purpose**: Short-lived, used for API authentication  
**Storage**: Client-side (localStorage, memory)  
**Refresh**: When expired, use refresh token

### Refresh Token (30 days)
```typescript
{
  id: number,
  iat: number,     // issued at
  exp: number      // expires in 30 days
}
```
**Purpose**: Long-lived, generates new access tokens  
**Storage**: Secure HttpOnly cookie OR secure storage  
**Revocation**: Stored in database, checked on verification  

### Token Flow Diagram
```
┌─────────────────────────────────────────────────────┐
│ 1. USER LOGS IN                                     │
│    POST /api/auth/login {email, password}          │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 2. SERVER VALIDATES & GENERATES TOKENS              │
│    ✅ Access Token (15m) + Refresh Token (30d)      │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 3. CLIENT STORES TOKENS                             │
│    - Access Token (memory/localStorage)             │
│    - Refresh Token (secure storage)                 │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 4. CLIENT USES ACCESS TOKEN FOR API REQUESTS        │
│    GET /api/auth/profile {Authorization: Bearer...} │
└─────────────────────┬───────────────────────────────┘
                      │
        ┌─────────────┴──────────────┐
        │                            │
    ✅ VALID              ❌ EXPIRED (401)
        │                            │
        ▼                            ▼
    Continue            POST /api/auth/refresh
                        {refreshToken}
                            │
                            ▼
                    ✅ New Token Pair
                    ❌ Invalid/Expired
```

### Benefits of This Approach
- ✅ **Short-lived access tokens** → minimize breach impact
- ✅ **Longer-lived refresh tokens** → seamless user experience
- ✅ **Token revocation** → instant logout capability
- ✅ **Token rotation** → security improvement per session
- ✅ **Database tracking** → complete audit trail

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  password VARCHAR NOT NULL (bcrypt hash),
  role VARCHAR DEFAULT 'customer',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Refresh Tokens Table
```sql
CREATE TABLE refresh_tokens (
  id INTEGER PRIMARY KEY,
  token VARCHAR UNIQUE NOT NULL,
  expiresAt DATETIME NOT NULL,
  revokedAt DATETIME NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Key Points**:
- ✅ `revokedAt` tracks invalidated tokens
- ✅ Cascade delete removes tokens when user deleted
- ✅ Unique token constraint prevents duplicates
- ✅ Efficient revocation check on verification

---

## 📡 All Endpoints

### Authentication Endpoints

#### 1️⃣ Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
**Response** (201):
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-03-23T10:00:00Z",
    "updatedAt": "2026-03-23T10:00:00Z"
  }
}
```

#### 2️⃣ Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "user": { /* user object */ },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3️⃣ Refresh Access Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Response** (200):
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 4️⃣ Logout User
```http
POST /api/auth/logout
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 5️⃣ Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <accessToken>
```
**Response** (200):
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-03-23T10:00:00Z",
    "updatedAt": "2026-03-23T10:00:00Z"
  }
}
```

### System Endpoints

#### 6️⃣ Health Check
```http
GET /health
```
**Response** (200):
```json
{
  "status": "ok",
  "time": "2026-03-23T10:30:00Z"
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"SecurePass123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}'
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<your_refresh_token>"}'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <your_access_token>"
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<your_refresh_token>"}'
```

---

## 📊 Input Validation Rules

All inputs are validated using **Zod schemas** before processing:

| Field | Rules | Example |
|-------|-------|---------|
| **Name** | Min 2 characters | "John Doe" |
| **Email** | Valid email format | "john@example.com" |
| **Password** | Min 8 chars, 1 uppercase, 1 number | "SecurePass123" |

**Error Response** (400):
```json
{
  "success": false,
  "errors": {
    "email": ["Invalid email address"],
    "password": ["Password must contain at least one uppercase letter"]
  }
}
```

---

## 🔒 Security Features

### Password Security
✅ **Bcrypt Hashing** with 12 rounds (industry standard)  
✅ Never store plain text passwords  
✅ Salted hashes prevent rainbow table attacks  

### Token Security
✅ **JWT with HS256** (HMAC SHA-256)  
✅ **Token expiration** (15m access, 30d refresh)  
✅ **Token revocation** in database  
✅ **Token rotation** on refresh  

### API Security
✅ **Input validation** with Zod  
✅ **HTTP-only considerations** for cookies  
✅ **CORS-ready** architecture  
✅ **Error handling** without info leakage  

### Database Security
✅ **Unique constraints** on email and tokens  
✅ **Foreign key constraints** with cascade delete  
✅ **Temporal data** (createdAt, updatedAt, revokedAt)  

---

## 📈 Production Checklist

- [ ] Set strong, unique `.env` secrets (32+ characters)
- [ ] Use HTTPS in production (set secure cookie flag)
- [ ] Enable CORS with specific origins
- [ ] Set up database backups
- [ ] Implement rate limiting on auth endpoints
- [ ] Add logging & monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Use environment-specific configs
- [ ] Enable request logging
- [ ] Implement auto-refresh token rotation
- [ ] Add email verification for registration
- [ ] Implement 2FA (optional)
- [ ] Set up API versioning (`/api/v1/auth/...`)

---

## 🤝 Contributing

This is a sample project for learning SOLID principles and token-based authentication.

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🎓 Learning Resources

- **SOLID Principles** in TypeScript
- **JWT Authentication** best practices
- **Refresh Token Mechanism** implementation
- **Express.js** middleware and routing
- **TypeORM** database management
- **Zod** schema validation
- **Swagger/OpenAPI 3.0** documentation

---

**Last Updated**: March 23, 2026  
**API Version**: 2.0.0 (with Refresh Token Support)
" 
