// Import required packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ ADD THIS

// Import user API routes
import userApi from "./APIs/UserApi.js";

// Load environment variables from .env file
dotenv.config();

// Create express application
const app = express();

// ✅ ADD THIS (VERY IMPORTANT)
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Connect user routes
app.use("/user-api", userApi);


/* ==================================
   DATABASE CONNECTION
================================== */
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);

        console.log("Database connected successfully");

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
================================== */
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

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