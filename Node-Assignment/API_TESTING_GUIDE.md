# API Testing Guide & Examples

**Version**: 2.0.0  
**Last Updated**: March 23, 2026

This guide provides real-world examples for testing all API endpoints with various tools and scenarios.

---

## 🧪 Quick Start - Test All Endpoints

### Step 1: Start Server
```bash
npm run dev
```

### Step 2: Access Swagger UI
```
http://localhost:3000/api-docs
```

### Step 3: Run Examples Below

---

## 📡 Complete API Examples

### 1️⃣ User Registration

#### Using cURL
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Using Postman
```
Method: POST
URL: http://localhost:3000/api/auth/register
Headers:
  Content-Type: application/json

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Using JavaScript/Fetch
```javascript
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Expected Response (201)
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-03-23T10:30:00.000Z",
    "updatedAt": "2026-03-23T10:30:00.000Z"
  }
}
```

#### Error Case: Duplicate Email (409)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Another User",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response**:
```json
{
  "success": false,
  "message": "Email already registered"
}
```

#### Error Case: Invalid Input (400)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "invalid-email",
    "password": "short"
  }'
```

**Response**:
```json
{
  "success": false,
  "errors": {
    "name": ["Name must be at least 2 characters"],
    "email": ["Invalid email address"],
    "password": [
      "Password must be at least 8 characters",
      "Password must contain at least one uppercase letter",
      "Password must contain at least one number"
    ]
  }
}
```

---

### 2️⃣ User Login

#### Using cURL
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Using Postman
```
Method: POST
URL: http://localhost:3000/api/auth/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Using JavaScript/Fetch
```javascript
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});

const { accessToken, refreshToken, user } = await loginResponse.json();
console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);
console.log('User:', user);
```

#### Expected Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-03-23T10:30:00.000Z",
    "updatedAt": "2026-03-23T10:30:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc5NTY3NDAwLCJleHAiOjE2Nzk1Njg0MDB9.abcdefg123456",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5NTY3NDAwLCJleHAiOjE2ODIyNDc0MDB9.xyzuvw789012"
}
```

#### Error Case: Invalid Credentials (401)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "WrongPassword"
  }'
```

**Response**:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3️⃣ Get User Profile

#### Using cURL
```bash
# First, store the token from login response
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

#### Using Postman
```
Method: GET
URL: http://localhost:3000/api/auth/profile
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Using JavaScript/Fetch
```javascript
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const profileResponse = await fetch('http://localhost:3000/api/auth/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const profile = await profileResponse.json();
console.log('User Profile:', profile.user);
```

#### Expected Response (200)
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-03-23T10:30:00.000Z",
    "updatedAt": "2026-03-23T10:30:00.000Z"
  }
}
```

#### Error Case: Missing Token (401)
```bash
curl -X GET http://localhost:3000/api/auth/profile
```

**Response**:
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

#### Error Case: Expired Token (401)
```bash
ACCESS_TOKEN="expired.token.here"

curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Response**:
```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

---

### 4️⃣ Refresh Access Token

#### Using cURL
```bash
REFRESH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

#### Using Postman
```
Method: POST
URL: http://localhost:3000/api/auth/refresh
Headers:
  Content-Type: application/json

Body (JSON):
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Using JavaScript/Fetch
```javascript
const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const refreshResponse = await fetch('http://localhost:3000/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});

const { accessToken, refreshToken: newRefreshToken } = await refreshResponse.json();
console.log('New Access Token:', accessToken);
console.log('New Refresh Token:', newRefreshToken);
```

#### Expected Response (200)
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc5NTY3NDAwLCJleHAiOjE2Nzk1Njg0MDF9.different123456",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5NTY3NDAwLCJleHAiOjE2ODIyNDc0MDF9.newtoken789012"
}
```

#### Error Case: Invalid Refresh Token (401)
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "invalid.token.here"
  }'
```

**Response**:
```json
{
  "success": false,
  "message": "Invalid refresh token"
}
```

#### Error Case: Expired Refresh Token (401)
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired..."
  }'
```

**Response**:
```json
{
  "success": false,
  "message": "Refresh token expired"
}
```

---

### 5️⃣ User Logout

#### Using cURL
```bash
ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
REFRESH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```

#### Using Postman
```
Method: POST
URL: http://localhost:3000/api/auth/logout
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

Body (JSON):
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Using JavaScript/Fetch
```javascript
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const logoutResponse = await fetch('http://localhost:3000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ refreshToken })
});

const result = await logoutResponse.json();
console.log('Logout Result:', result);
```

#### Expected Response (200)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Error Case: Invalid Access Token (401)
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer invalid.token" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response**:
```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

---

### 6️⃣ Health Check

#### Using cURL
```bash
curl http://localhost:3000/health
```

#### Using Browser
```
http://localhost:3000/health
```

#### Expected Response (200)
```json
{
  "status": "ok",
  "time": "2026-03-23T10:30:00.000Z"
}
```

---

## 🔄 Complete Workflow Example

### Scenario: User Registration, Login, and Profile Access

```bash
# 1. REGISTER USER
echo "=== 1. Register User ==="
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass123"
  }')

echo $REGISTER_RESPONSE | jq '.'

# 2. LOGIN
echo -e "\n=== 2. Login User ==="
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123"
  }')

echo $LOGIN_RESPONSE | jq '.'

# Extract tokens using jq
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')

echo "Access Token: $ACCESS_TOKEN"
echo "Refresh Token: $REFRESH_TOKEN"

# 3. GET PROFILE
echo -e "\n=== 3. Get User Profile ==="
curl -s -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.'

# 4. WAIT FOR ACCESS TOKEN TO EXPIRE (or manually refresh)
echo -e "\n=== 4. Refresh Access Token ==="
REFRESH_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }")

echo $REFRESH_RESPONSE | jq '.'

# Extract new token
NEW_ACCESS_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.accessToken')
NEW_REFRESH_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.refreshToken')

echo "New Access Token: $NEW_ACCESS_TOKEN"
echo "New Refresh Token: $NEW_REFRESH_TOKEN"

# 5. GET PROFILE WITH NEW TOKEN
echo -e "\n=== 5. Get Profile with New Token ==="
curl -s -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $NEW_ACCESS_TOKEN" | jq '.'

# 6. LOGOUT
echo -e "\n=== 6. Logout User ==="
curl -s -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $NEW_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"refreshToken\": \"$NEW_REFRESH_TOKEN\"
  }" | jq '.'

# 7. TRY TO ACCESS PROFILE AFTER LOGOUT (should fail)
echo -e "\n=== 7. Try Profile Access After Logout (should fail) ==="
curl -s -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $NEW_ACCESS_TOKEN" | jq '.'
```

**Expected Output Sequence**:
1. ✅ Registration successful
2. ✅ Login returns tokens
3. ✅ Profile retrieved successfully
4. ✅ New tokens issued
5. ✅ Profile retrieved with new token
6. ✅ Logout successful
7. ❌ Profile access fails (token not revoked from access perspective, but refresh won't work)

---

## 🧑‍💻 Integration Testing

### Node.js/Jest Test Example

```typescript
import request from 'supertest';
import app from '../src/app';

describe('Auth Endpoints', () => {
  let accessToken: string;
  let refreshToken: string;

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should login user and return tokens', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123'
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
  });

  it('should get user profile with access token', async () => {
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should refresh tokens', async () => {
    const response = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
  });

  it('should logout user', async () => {
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

---

## 📊 Response Status Codes

| Status | Meaning | When Used |
|--------|---------|-----------|
| **200** | OK | Successful GET/POST/PUT |
| **201** | Created | Resource created (register) |
| **400** | Bad Request | Validation error |
| **401** | Unauthorized | Missing/invalid token |
| **409** | Conflict | Email already exists |
| **500** | Server Error | Unexpected error |

---

## 🔍 Debugging Tips

### Check Token Contents
```bash
# Decode JWT (online tool)
# https://jwt.io

# Or use Node.js
node -e "console.log(JSON.stringify(require('jsonwebtoken').decode('YOUR_TOKEN'), null, 2))"
```

### Check Database
```bash
# SQLite shell
sqlite3 ecommerce.sqlite

# View users
SELECT * FROM users;

# View refresh tokens
SELECT id, token, expiresAt, revokedAt FROM refresh_tokens;

# Check if token is revoked
SELECT * FROM refresh_tokens WHERE revokedAt IS NOT NULL;
```

### Enable Verbose Logging
```bash
# Add to .env
DEBUG=*

# Or specific to this app
DEBUG=auth-api:*
```

---

## 🎯 Common Issues & Solutions

### Issue: "Email already registered"
**Solution**: Use a different email or clear the database

### Issue: "Invalid or expired token"
**Solution**: 
1. Check token hasn't expired (15m for access, 30d for refresh)
2. Ensure correct secret in .env
3. Verify token format: `Authorization: Bearer <token>`

### Issue: "Invalid refresh token"
**Solution**:
1. Token might be revoked (logout was called)
2. Token might be expired (older than 30 days)
3. Check database for `revokedAt` field

---

**Version**: 2.0.0 (Refresh Token Support)  
**Last Updated**: March 23, 2026
