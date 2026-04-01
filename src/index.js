import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(
                `${process.env.APP_NAME} app listening on port ${port}`,
            );
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);

        process.exit(1);
    });
