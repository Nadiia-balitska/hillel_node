const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", {
    title: "about",
  });
});

router.get("/123", (req, res) => {
  res.render("about", {
    title: "123",
  });
});

module.exports = router;
