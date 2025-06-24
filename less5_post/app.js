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
    // if (!file.mimetype.startsWith("image/")) {
    //   return cb(new Error("only img"));
    // }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

//обробка неправильного формату(валідація)
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(null, false);
  }
};
const limits = {
  fileSize: 1 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

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

// app.post("/upload-file", upload.single("file"), (req, res) => {
//   console.log("load file:", req.file);
//   if (!req.file) {
//     return res.statusCode(400).json({ err: "only img" });
//   }
//   res.send("file was loaded");
// });

app.post("/upload-file", (req, res) => {
  //manual invocation of middleware function
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        console.log("err only img");
        return res.statusCode(400).json({ err: "file to large" });
      }
      if (err instanceof multer.MulterError) {
        console.log("err only img");
        return res
          .statusCode(400)
          .json({ err: "file upload err" + err.message });
      }
      return res.status(500).json({ error: "server error" });
    }
    if (!req.file) {
      console.log("err only img");
      return res.status(400).json({ error: "only img" });
    }
    console.log("load file:", req.file);
    res.send("file was loaded");
  });
});
