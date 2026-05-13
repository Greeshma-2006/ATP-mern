# BlogApp

A full-stack MERN Blog Application with role-based authentication for **Users**, **Authors**, and **Admins**. Users can read articles and comment, Authors can create/manage articles, and Admins can manage the platform.

## Features

## Authentication

* Register / Login / Logout
* JWT authentication with HTTP-only cookies
* Session restore on refresh
* Role-based access control

## User Features

* View articles
* Read full article details
* Add comments
* View profile with image

## Author Features

* Author dashboard
* Create articles
* View own articles
* Edit articles
* Soft delete / restore articles
* Profile with uploaded image


## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Zustand
* Axios
* Tailwind CSS
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* bcryptjs
* Multer
* CORS
* cookie-parser
* dotenv

## Deployment

### Backend (Render)

* Root Directory: `week9_10/BlogApp/BlogAppBackend`
* Build Command: `npm install`
* Start Command: `node server.js`

### Frontend (Vercel)

* Root Directory: `week9_10/BlogApp/frontend`
* Build Command: `npm run build`
* Output Directory: `dist`

## Notes

* Update frontend API URLs after backend deployment.
* Add deployed frontend URL in backend CORS settings.
* Use MongoDB Atlas for production database.

## Author

**Gudladona Greeshma**

