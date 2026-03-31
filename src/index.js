import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log(process.env.APP_NAME);
console.log(process.env.APP_ENV);
