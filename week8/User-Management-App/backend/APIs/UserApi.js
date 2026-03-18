// Import express
import express from "express";

// Import User model
import User from "../models/UserModel.js";

// Create router (mini express app)
const userApi = express.Router();


/* CREATE USER
   Endpoint: POST /user-api/create-user
 */
userApi.post("/create-user", async (req, res, next) => {
    try {
        // Create new user using request body data
        const newUser = await User.create(req.body);

        // Send success response
        res.status(201).json({
            message: "User created successfully",
            data: newUser
        });

    } catch (err) {
        next(err); // send error to error middleware
    }
});


/*READ ALL USERS
   Endpoint: GET /user-api/users
 */
userApi.get("/users", async (req, res, next) => {
    try {
        // Fetch all users from database
        const users = await User.find();

        res.json({
            message: "All users fetched",
            data: users
        });

    } catch (err) {
        next(err);
    }
});


/*  READ USER BY ID
   Endpoint: GET /user-api/users/:id
 */
userApi.get("/users/:id", async (req, res, next) => {
    try {
        // Find user using MongoDB ID
        const user = await User.findById(req.params.id);

        // If user not found
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User found",
            data: user
        });

    } catch (err) {
        next(err);
    }
});


/* UPDATE USER BY ID
   Endpoint: PUT /user-api/users/:id
 */
userApi.put("/users/:id", async (req, res, next) => {
    try {
        // Update user and return updated document
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,     // id
            req.body,          // new data
            { new: true }      // return updated version
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (err) {
        next(err);
    }
});


/*  DELETE USER BY ID
   Endpoint: DELETE /user-api/users/:id
 */
userApi.delete("/users/:id", async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            data: deletedUser
        });

    } catch (err) {
        next(err);
    }
});

//put and patch
// Export router
export default userApi;