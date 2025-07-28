module.exports = function ({ tasksCollection, usersCollection }) {
  const express = require("express");
  const router = express.Router();

  router.get("/dashboard", async (req, res) => {
    if (!req.session.email) {
      return res.redirect("/login");
    }

    let role = req.session.role || "user";
    const allUsers = await usersCollection.find({}).toArray();
    const tasks = await tasksCollection
      .find({ role: req.session.role })
      .toArray();

    res.render("dashboard", {
      email: req.session.email,
      role,
      tasks,
      users: allUsers,
    });
  });
  return router;
};
