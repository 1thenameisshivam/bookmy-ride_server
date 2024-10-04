import dotenv from "dotenv";
dotenv.config();

export const { DB_URL, PORT, FRONTEND_URL } = process.env;
