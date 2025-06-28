const config = require("config");
const express = require("express");

const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.listen(config.port, () => {
  console.log(`Server is running in port  http://localhost:${config.port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/zip", "application/x-zip-compressed"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Тільки .zip файли дозволено!"), false);
  }
};

const limits = {
  fileSize: 512 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

app.get("/", (req, res) => {
  const file = path.join(__dirname, "public", "form.html");
  res.sendFile(file);
});

app.post("/upload-file", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        console.log("only zip files");
        return res.statusCode(400).json({ err: "The file is too large" });
      }
      if (err instanceof multer.MulterError) {
        console.log("only zip files");
        return res
          .statusCode(400)
          .json({ err: "file upload err" + err.message });
      }
      return res.status(500).json({ error: "server error" });
    }
    if (!req.file) {
      console.log("only zip files");
      return res.status(400).json({ error: "only zip files" });
    }
    console.log("load file:", req.file);
    res.send("the file was uploaded successfully");
  });
});
