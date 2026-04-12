import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVeificationTemplate, sendEmail } from "../utils/mail.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ApiError(
            "A user with this email or username is already registered.",
            409,
        );
    }

    const user = await User.create({ username, email, password });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    const { unhashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.refreshToken = refreshToken;
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    const emailOptions = {
        to: user.email,
        from: process.env.APP_EMAIL,
        subject: "Verify your email",
        content: emailVeificationTemplate(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unhashedToken}`,
        ),
    };

    await sendEmail(emailOptions);

    res.status(201).json(
        new ApiResponse(
            "A verification email has been sent to your email address. Please verify your email to complete the registration process.",
            201,
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                accessToken,
            },
        ),
    );
});

export { registerUser };
