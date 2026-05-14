# BlogApp - MERN Stack Blogging Platform

## Overview

BlogApp is a full-stack MERN application where users can create, manage, and explore blog articles. The project includes authentication, role-based access, blog management features, and a responsive user interface.

This application is built using the MERN Stack:

- MongoDB – Database
- Express.js – Backend framework
- React.js – Frontend library
- Node.js – Runtime environment

---

## Features

### User Features

- User registration and login system
- Secure authentication using JWT
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- View all blogs from all users
- Read full blog details
- Responsive UI for mobile and desktop
- Real-time frontend updates
- Protected routes for authenticated users

### Admin / Author Features

- Manage blogs efficiently
- Access protected dashboard features
- Update blog content anytime
- Delete unwanted blogs

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS / Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

---

## Project Structure

```bash
BlogApp/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│
└── README.md
---

## Prerequisites

Before running this project, make sure the following software is installed:

- Node.js
- npm
- MongoDB
- Git
- VS Code (Recommended)

---

## Clone the Repository

```bash
git clone https://github.com/Greeshma-2006/ATP-mern.git
```

## Move into Project Folder

```bash
cd ATP-mern/week9-10/BlogApp
```

---

## Backend Setup

### Step 1: Open Backend Folder

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create .env File

Create a `.env` file inside the backend folder.

### Example .env File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Run Backend Server

```bash
npm start
```

OR

```bash
npm run dev
```

Backend server will run on:

```bash
http://localhost:5000
```

---

## Frontend Setup

### Step 1: Open Frontend Folder

Open a new terminal.

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## MongoDB Setup

### Local MongoDB

Start MongoDB locally before running backend.

```bash
mongod
```

### MongoDB Atlas

You can also use MongoDB Atlas cloud database.

1. Create MongoDB Atlas account
2. Create a cluster
3. Copy connection string
4. Paste connection string in `.env` file

---

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Blog Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/blogs | Get all blogs |
| GET | /api/blogs/:id | Get single blog |
| POST | /api/blogs | Create blog |
| PUT | /api/blogs/:id | Update blog |
| DELETE | /api/blogs/:id | Delete blog |

---

## Authentication

This project uses:

- JWT (JSON Web Token)
- Password hashing using bcryptjs
- Protected backend routes
- Authorization middleware

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |

---

## Deployment

### Frontend Deployment

You can deploy frontend using:

- Vercel
- Netlify
- GitHub Pages

### Backend Deployment

You can deploy backend using:

- Render
- Railway
- Cyclic

### Database Deployment

- MongoDB Atlas

---

## Git Commands

### Initialize Git

```bash
git init
```

### Add Files

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Initial Commit"
```

### Push to GitHub

```bash
git push origin main
```

---

## Troubleshooting

### Node Modules Error

Delete node_modules and reinstall:

```bash
rm -rf node_modules
npm install
```

### Port Already Running

Change PORT number in `.env` file.

### MongoDB Connection Error

- Check MongoDB is running
- Verify MONGO_URI
- Check internet connection for Atlas

---

## Learning Outcomes

Through this project, the following concepts were implemented:

- MERN Stack Development
- REST API Development
- Authentication & Authorization
- CRUD Operations
- MongoDB Database Integration
- Frontend Routing
- State Management
- API Integration using Axios
- Backend Middleware
- Full Stack Project Structure

---

## Author

### Gudladona Greeshma

- GitHub: https://github.com/Greeshma-2006

---

## License

This project is developed for educational and learning purposes.

---

## Support

If you like this project:

- Star the repository
- Fork the repository
- Share with others
- Contribute to the project

---

## Conclusion

BlogApp is a beginner-friendly full-stack MERN blogging application that demonstrates complete frontend and backend integration with authentication, CRUD operations, and MongoDB database connectivity. This project is useful for learning real-world MERN stack development concepts and deployment workflows.