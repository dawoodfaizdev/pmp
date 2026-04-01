import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} app listening on port ${port}`);
});
