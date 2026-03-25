import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './API/userApi.js';
import authorRoute from './API/authorApi.js';
import commonRouter from './API/commonApi.js';
import { adminRouter } from './API/adminApi.js';

dotenv.config();

const app = express();


// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());


// CORS CONFIGURATION
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ROUTES
app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/common-api', commonRouter);
app.use('/admin-api', adminRouter);


// DATABASE CONNECTION
mongoose.connect(process.env.DB_URL)
.then(() => {

  console.log("DB connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch(err => {
  console.error("DB connection failed:", err);
});


// INVALID PATH HANDLER
app.use((req, res) => {
  res.status(404).json({
    message: `${req.url} is invalid path`
  });
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {

    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`
    });

  }

  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message
    });
  }

  res.status(500).json({
    message: "error occurred",
    error: "Server side error"
  });

});