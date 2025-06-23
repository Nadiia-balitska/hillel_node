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
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("home");
});

//відправка даних через форму

app.get("/form", (req, res) => {
  const file = path.join(__dirname, "public", "form.html");
  res.sendFile(file);
});
app.get("/page", (req, res) => {
  const file = path.join(__dirname, "public", "page.html");
  res.sendFile(file);
});

app.post("/post-data", (req, res) => {
  res.json(req.body);
});

app.post("/upload-file", upload.single("file"), (req, res) => {
  console.log("load file:", req.file);
  res.send("file was loaded");
});
