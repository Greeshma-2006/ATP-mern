// Import mongoose
import mongoose from "mongoose";

// Create schema (structure of user document)
const userSchema = new mongoose.Schema({

    // Name field (required string)
    name: {
        type: String,
        required: true
    },

    // Email field (required + unique)
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Date of birth (stored as Date type)
    dob: {
        type: Date,
        required: true
    },

    // Mobile number (stored as Number)
    no: {
        type: Number,
        required: true
    }

}, {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
});

// Create model using schema
// "User" becomes "users" collection in MongoDB automatically
const User = mongoose.model("User", userSchema);

// Export the model
export default User;