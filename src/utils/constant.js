import dotenv from "dotenv";
dotenv.config();

export const { DB_URL, PORT,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } = process.env;
 