const fs = require("fs");
const path = require("path");

async function loadTasks(tasksCollection) {
  const tasksPath = path.join(__dirname, "../config/tasks.json");
  const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf8"));

  const count = await tasksCollection.countDocuments();
  if (count === 0) {
    await tasksCollection.insertMany(tasks);
    console.log("✅ Tasks successfully loaded into MongoDB");
  } else {
    console.log("ℹ️ Tasks already exist in DB, skipping import");
  }
}

module.exports = loadTasks;
