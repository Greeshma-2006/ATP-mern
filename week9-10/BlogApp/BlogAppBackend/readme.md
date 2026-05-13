### Backend Development Overview
Initialized Git repository and managed project files using Git.
Added .gitignore file to ignore unnecessary files like node_modules and .env.
Used .env file to securely store environment variables such as MongoDB URI and JWT secret key.
Created backend setup using Node.js and Express.js.
Connected backend server with MongoDB using Mongoose.
Implemented middleware for request parsing, authentication, and error handling.
Designed database schemas and models for storing user and blog data.
Secured user passwords using hashing and salt values with bcrypt.
Implemented JWT-based authentication for secure login and protected routes.
Stored JWT tokens in cookies for maintaining user sessions securely.
Developed REST APIs for user authentication and blog operations.
Organized backend using modular folder structure for scalability and maintainability.

### Authentication Flow
Client sends login request with email and password.
Server validates user credentials from database.
Server generates JWT token after successful login.
Token is stored in browser cookies.
Client sends requests with token for protected routes.
Server verifies token and responds accordingly.

### Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
dotenv