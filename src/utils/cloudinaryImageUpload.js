// import cloudinary from "../config/cloudinary.config.js";
// import { PassThrough } from "stream";
// // import { response } from "express";
// const cloudinaryUpload = async (
//     buffer,
//     fileName,
//     folder,
//     format,
//     retries = 3
// ) => {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//             // console.log("In try Block");
//             const result = await cloudinary.uploader.upload_stream(
//                 {
//                     filename_override: fileName,
//                     folder: folder,
//                     format: format,
//                 },
//                 (error, result) => {
//                     if (error) {
//                         throw new Error(
//                             "Cloudinary Upload Error : " + error.message
//                         );
//                     }
//                     return result;
//                 }
//             );
//             // console.log("Cloudinary result is: "+result);
//             const stream = new PassThrough();
//             stream.end(buffer);
//             stream.pipe(result);
//         } catch (error) {
//             if (attempt === retries) {
//                 throw new Error("Cloudinary Upload Error: " + error.message);
//             }
//             console.log(`Retrying upload (${attempt}/${retries})...`);
//         }
//     }
// };

// export default cloudinaryUpload;

import cloudinary from "../config/cloudinary.config.js";
import { PassThrough } from "stream";

const cloudinaryUpload = async (
    buffer,
    fileName,
    folder,
    format,
    retries = 3
) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await new Promise((resolve, reject) => {
                // Create Cloudinary upload stream
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        filename_override: fileName,
                        folder: folder,
                        format: format,
                    },
                    (error, result) => {
                        if (error) {
                            return reject(
                                new Error(
                                    "Cloudinary Upload Error: " + error.message
                                )
                            );
                        }
                        resolve(result); // Resolve the result on success
                    }
                );

                // Convert buffer to stream
                const stream = new PassThrough();
                stream.end(buffer); // Write buffer to stream
                stream.pipe(uploadStream); // Pipe the stream to Cloudinary's upload stream
            });

            // Return result if upload is successful
            return result;
        } catch (error) {
            if (attempt === retries) {
                throw new Error(
                    "Cloudinary Upload Error after retries: " + error.message
                );
            }
            console.log(`Retrying upload (${attempt}/${retries})...`);
        }
    }
};

export default cloudinaryUpload;
