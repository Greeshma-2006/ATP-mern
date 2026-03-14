// Import required packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import user API routes
import userApi from "./APIs/UserApi.js";

// Load environment variables from .env file
dotenv.config();

// Create express application
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Connect user routes
// All routes will start with /user-api
app.use("/user-api", userApi);


/* ==================================
   DATABASE CONNECTION
================================== */
async function connectDB() {
    try {
        // Connect to MongoDB using DB_URL from .env
        await mongoose.connect(process.env.DB_URL);

        console.log("Database connected successfully");

        // Start server after DB connection success
        const port = process.env.PORT || 8000;

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}


/* ==================================
   ERROR HANDLING MIDDLEWARE
   This catches all server errors
================================== */
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});


// Call database connection
connectDB();