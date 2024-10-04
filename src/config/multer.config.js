// import multer from "multer";
// const fileTypes = /jpeg|jpg|png|gif/;

// // Configure Multer storage
// const storage = multer.memoryStorage(); // Store files in memory

// // File filter function to validate uploaded files
// const fileFilter = (req, file, cb) => {
//     const isValid = fileTypes.test(file.mimetype);
//     if (!isValid) {
//         throw new Error("Invalid file type for the image"); // Reject the file
//     }
// };
// // Set up Multer with file size limits (e.g., 5MB)
// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
//     },
// });

// export default upload;

import multer from "multer";
import path from "node:path";

const upload = multer({
    
    dest: path.resolve("__dirname/../public/uploads/images"),
    limits: {
        fileSize: 5 * 1024 * 1024, //file size max:5MB
    },
});

export default upload;
