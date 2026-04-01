import express from "express";
import cors from "cors";
import { ApiResponse } from "./utils/api-response.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
);

app.get("/", (req, res) => {
    res.send(new ApiResponse("Hello World!"));
});

export default app;
