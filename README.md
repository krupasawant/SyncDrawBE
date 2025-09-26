# SyncDraw (Backend)

SyncDraw Backend provides the REST API and database services for saving, loading, and managing designs created in the SyncDraw frontend application. 
It handles authentication, design persistence, and basic CRUD operations.

# Features

Design Management API:
- Create new designs
- Fetch existing designs
- Update designs
- Delete designs

Persistence:
- Stores design data in MongoDB, including elements, transformations, and properties.

Authentication:
- Integrates with Clerk for secure user authentication.

# Tech Stack

Framework: Node.js + Express
Database: MongoDB
Authentication: Clerk integration for server-side auth
Realtime (Optional): Socket.io (future support for real-time collaboration)

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

# API Endpoints
Method	Endpoint	Description
- GET	/designs	Fetch all designs for the user
- POST	/designs	Create a new design
- GET	/designs/:id	Fetch a specific design by ID
- PUT	/designs/:id	Update a specific design

Authentication: All endpoints require a valid Clerk token in the Authorization header.

# Out of Scope / Future Work

- Real-time collaboration between multiple users
- Comments and mentions on designs

These features may be added in future versions.
