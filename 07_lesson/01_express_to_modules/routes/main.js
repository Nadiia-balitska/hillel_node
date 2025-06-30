const express = require("express");
const router = express.Router();

// app.get("/", (req, res) => {
//   res.send("Home");
// });

router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;
