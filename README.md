# SyncDraw (Backend)

SyncDraw Backend provides the REST API and database services for saving, loading, and managing designs created in the SyncDraw frontend application. 
It handles authentication, design persistence, and basic CRUD operations.

# Architecture Overview

The backend is designed as a RESTful API server with a modular architecture:

1. Node.js + Express – Handles HTTP requests and routes.
2. MongoDB – Stores user designs, including elements, properties, and transformations.
3. Clerk – Manages authentication and user identity.
4. Controllers / Routes – Separate files for handling different endpoints.
5. Models – Mongoose schemas define the structure of design documents.


# MongoDB Schema (designs Collection)

Stores all design documents for the application.

| Field           | Type     | Description                                 |
| --------------- | -------- | ------------------------------------------- |
| `_id`           | ObjectId | Unique MongoDB ID                           |
| `userId`        | String   | Clerk user identifier                       |
| `collaborators` | Array    | List of userIds with access (empty for MVP) |
| `title`         | String   | Design title                                |
| `data`          | Array    | Array of elements (shapes, text, images)    |
| `lastUpdated`   | Date     | Timestamp of last update                    |
| `__v`           | Number   | Mongoose internal version key               |


# API Endpoints
Method	Endpoint	Description
- GET	/designs	Fetch all designs for the user
- POST	/designs	Create a new design
- PUT	/designs/:id	Update a specific design

Authentication: All endpoints require a valid Clerk token in the Authorization header.

# Setup
Prerequisites
- Node.js v18+
- MongoDB (local or cloud)
- Clerk account for authentication

# Installation

- git clone <BACKEND_REPO_URL>
- cd backend
- npm install

(Set MONGO_URI and Clerk API keys in .env)
- npm run dev
The backend will run on http://localhost:5000 by default.



# Out of Scope / Future Work

- Real-time collaboration between multiple users
- Comments and mentions on designs

These features may be added in future versions.
