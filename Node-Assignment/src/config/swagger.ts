import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce Auth API",
      version: "2.0.0",
      description:
        "SOLID Principle Based Authentication API with JWT + Refresh Token mechanism. Provides user registration, login, token refresh, logout and profile retrieval with role-based access control.",
      contact: {
        name: "Development Team",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
      {
        url: "http://localhost:8000",
        description: "Alternative Development Port",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Access token (JWT) - Insert without 'Bearer' prefix",
        },
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              example: "John Doe",
              description: "Full name (min 2 characters)",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
              description: "Valid email address",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "Secret123!",
              description: "Password: min 8 chars, 1 uppercase, 1 number",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "Secret123!",
            },
          },
        },
        RefreshTokenInput: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIn0...",
              description: "Valid refresh token obtained from login response",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            role: {
              type: "string",
              default: "customer",
              example: "customer",
              enum: ["customer", "admin"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-23T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-03-23T10:30:00Z",
            },
          },
        },
        TokenResponse: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              description: "JWT access token (expires in 15 minutes)",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0...",
            },
            refreshToken: {
              type: "string",
              description: "Refresh token (expires in 30 days)",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.tnmfKqZ6cP8...",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            errors: {
              type: "object",
              example: {
                email: ["Invalid email address"],
                password: [
                  "Password must be at least 8 characters",
                  "Password must contain at least one uppercase letter",
                ],
              },
            },
          },
        },
      },
    },
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          description:
            "Create a new user account with email and password. Validates input and ensures unique email.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterInput" },
                examples: {
                  valid: {
                    value: {
                      name: "John Doe",
                      email: "john@example.com",
                      password: "SecurePass123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        type: "object",
                        properties: {
                          user: { $ref: "#/components/schemas/UserResponse" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            409: {
              description: "Email already registered",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "Login with credentials",
          description:
            "Authenticate user with email and password. Returns access token (15m) and refresh token (30d).",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginInput" },
                examples: {
                  valid: {
                    value: {
                      email: "john@example.com",
                      password: "SecurePass123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      { $ref: "#/components/schemas/TokenResponse" },
                      {
                        type: "object",
                        properties: {
                          user: { $ref: "#/components/schemas/UserResponse" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
                },
              },
            },
            401: {
              description: "Invalid email or password",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/refresh": {
        post: {
          tags: ["Authentication"],
          summary: "Refresh access token",
          description:
            "Use refresh token to obtain new access token and refresh token. Previous refresh token is revoked.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshTokenInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Tokens refreshed successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      { $ref: "#/components/schemas/TokenResponse" },
                    ],
                  },
                },
              },
            },
            400: {
              description: "Missing refresh token",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            401: {
              description: "Invalid or expired refresh token",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/logout": {
        post: {
          tags: ["Authentication"],
          summary: "Logout user",
          description: "Revoke the provided refresh token and invalidate the user session.",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshTokenInput" },
              },
            },
          },
          responses: {
            200: {
              description: "Logged out successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessResponse" },
                },
              },
            },
            400: {
              description: "Missing refresh token",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            401: {
              description: "Access token invalid or expired",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            500: {
              description: "Server error during logout",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/auth/profile": {
        get: {
          tags: ["User"],
          summary: "Get current user profile",
          description:
            "Retrieve the profile of the authenticated user. Requires valid access token.",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "User profile retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        type: "object",
                        properties: {
                          user: { $ref: "#/components/schemas/UserResponse" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: "Access token missing or invalid",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/health": {
        get: {
          tags: ["System"],
          summary: "Health check",
          description: "Check if the API server is running and healthy.",
          responses: {
            200: {
              description: "Server is running",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        example: "ok",
                      },
                      time: {
                        type: "string",
                        format: "date-time",
                        example: "2026-03-23T10:30:00Z",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
