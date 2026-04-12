import express from "express";
import cors from "cors";
import healthCheckrouter from "./routes/healthcheck.routes.js";
import authrouter from "./routes/auth.routes.js";

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

app.use("/api/v1/healthcheck", healthCheckrouter);
app.use("/api/v1/auth", authrouter);

export default app;
