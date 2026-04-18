import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// ROUTES IMPORT
import { userRoute } from './API/userApi.js';
import authorRoute from './API/authorApi.js'; 
import commonRouter from './API/commonApi.js';
import { adminRouter } from './API/adminApi.js';

dotenv.config();

const app = express();


// ================== GLOBAL MIDDLEWARES ==================
app.use(express.json());
app.use(cookieParser());


// ================== CORS CONFIGURATION ==================
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
 
// ================== STATIC FILES ==================
app.use("/uploads", express.static("uploads"));

// ================== ROUTES ==================
app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/common-api', commonRouter);
app.use('/admin-api', adminRouter);


// ================== DATABASE CONNECTION ==================
mongoose.connect(process.env.DB_URL)
.then(() => {

  console.log("DB connected");

  const PORT = process.env.PORT || 5000;   // better practice

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch(err => {
  console.error("DB connection failed:", err.message);
});


// ================== INVALID PATH HANDLER ==================
app.use((req, res) => {
  res.status(404).json({
    message: `${req.url} is invalid path`
  });
});


// ================== GLOBAL ERROR HANDLER ==================
app.use((err, req, res, next) => {

  console.log("Error:", err);

  // validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  // invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  // duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`
    });
  }

  // custom errors (from authService etc.)
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message
    });
  }

  // default error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error"
  });

});