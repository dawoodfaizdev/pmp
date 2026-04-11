import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: "https://placehold.co/200x200?font=roboto",
                localPath: "",
            },
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is a required field"],
            trim: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
        },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
        },
    );
};

userSchema.methods.generateTemporaryToken = function () {
    const unhashedToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256", process.env.TEMPORARY_TOKEN_SECRET)
        .update(unhashedToken)
        .digest("hex");

    const tokenExpiry = Date.now() + 10 * 60 * 1000;

    return {
        unhashedToken,
        hashedToken,
        tokenExpiry,
    };
};

export const user = mongoose.model("User", userSchema);
