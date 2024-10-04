import cloudinary from "../config/cloudinary.config.js";
// import { response } from "express";
const cloudinaryUpload = async (filePath, fileName, folder, format) => {
    try {
        // console.log("In try Block");
        const result = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: folder,
            format: format,
        });
        // console.log("Cloudinary result is: "+result);
        return result;
    } catch (error) {
        console.log("Error is: ", error);
        throw new Error("Something Went Wrong in Cloudinary Upload");
    }
};

export default cloudinaryUpload;
