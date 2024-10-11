import multer from "multer";
import path from "node:path";

const storage = multer.memoryStorage();

const upload = multer({
    // dest: path.resolve("__dirname/../public/uploads/images"),
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //file size max:5MB
    },
});

export default upload;
