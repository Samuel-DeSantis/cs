# cs

Check to see how many lines of code there are:
`git ls-files '*.js' '*.jsx' '*.css' | xargs wc -l`

This is a Node.js-based server application built with Express.js and MongoDB. It provides APIs for managing users, projects, and circuits. The application is modular, with separate routes, controllers, and models for each resource.

## Features

### User Management
- **Signup**: Create a new user with details such as name, email, password, role, and organization.
- **Login**: Authenticate users using email and password.
- **Password Hashing**: Securely hash passwords using bcrypt.

### Project Management
- **Create Project**: Add a new project with details like name, description, client, location, and status.
- **Retrieve Projects**: Fetch all projects or a specific project by ID.
- **Update Project**: Modify project details.
- **Delete Project**: Remove a project by ID.
- **Relationships**: Projects are linked to users and circuits.

### Circuit Management
- **Create Circuit**: Add a new circuit with details like circuit number, equipment, length, and more.
- **Retrieve Circuits**: Fetch all circuits or a specific circuit by ID.
- **Update Circuit**: Modify circuit details.
- **Delete Circuit**: Remove a circuit by ID.
- **Relationships**: Circuits are linked to projects.

### Logging
- **Custom Logger**: Logs messages with different levels (info, error, debug, warn) in JSON format.

### Middleware
- **Authentication**: Provides utilities for password hashing and comparison.

### Database
- **MongoDB**: Used as the database for storing users, projects, and circuits.
- **Mongoose**: Provides schema-based modeling for MongoDB.

## API Endpoints
### Users
- POST /api/auth/signup: Create a new user.
- POST /api/auth/login: Authenticate a user.
### Projects
- GET /api/projects: Retrieve all projects.
- GET /api/projects/:id: Retrieve a specific project by ID.
- POST /api/projects: Create a new project.
- PUT /api/projects/:id: Update a project by ID.
- DELETE /api/projects/:id: Delete a project by ID.
### Circuits
- GET /api/circuits: Retrieve all circuits.
- GET /api/circuits/:id: Retrieve a specific circuit by ID.
- POST /api/circuits: Create a new circuit.
- PUT /api/circuits/:id: Update a circuit by ID.
- DELETE /api/circuits/:id: Delete a circuit by ID.