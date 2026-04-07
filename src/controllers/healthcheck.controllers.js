import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse("The server is healthy and running!"));
});

export { healthCheck };
