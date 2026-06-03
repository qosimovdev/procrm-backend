const multer = require("multer");
const path = require("path");

// PROJECT ROOTNI TOPIB OLAMIZ
const uploadPath = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext =
            file.mimetype === "image/png"
                ? ".png"
                : file.mimetype === "image/webp"
                    ? ".webp"
                    : ".jpg";

        cb(null, `${Date.now()}${ext}`);
    },
});
const upload = multer({ storage });

module.exports = upload;