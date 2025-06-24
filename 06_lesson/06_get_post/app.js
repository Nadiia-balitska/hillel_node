const express = require("express");
const config = require("config");

const path = require("path");
const fs = require("fs");
const json = require(".public/sample.json");

const app = express();

app.listen(config.port, () => {
  console.log(`Server is running in port  http://localhost:${config.port}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("home");
});

app.post("/get-json", (req, res) => {
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
