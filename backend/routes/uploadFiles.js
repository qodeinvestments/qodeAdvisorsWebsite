const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

// Configure multer storage
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const uploadFiles = (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const filePath = path.join(uploadDir, req.file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            res.status(200).json(results); // Send CSV data as JSON back to the frontend
        })
        .on("error", (error) => {
            res.status(500).json({ error: error.message });
        });
};

module.exports = { upload, uploadFiles };
