# Production Ready Authentication System

This is a backend authentication system built with Express.js, MongoDB, and JWT.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up environment variables in `.env` (already created).
3.  Start the server:
    ```bash
    npm run dev
    ```

## API Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### 3. Get Current User (Protected)
**GET** `/api/auth/me`

**Headers:**
`Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "test@example.com",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "__v": 0
  }
}
```

## Features
- **Security**: Helmet headers, Password Hashing (bcrypt), JWT tokens.
- **Structure**: MVC Pattern (Models, Views/Controllers, Routes).
- **Error Handling**: Centralized error middleware prevents info leaks.
