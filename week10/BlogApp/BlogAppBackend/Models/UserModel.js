import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    profileImageUrl: String,
    role: {
        type: String,
        enum: ["AUTHOR", "USER", "ADMIN"]
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

//create model
export const UserTypeModel = model("User", userSchema);
