const { MongoClient } = require("mongodb");
const config = require("config");

const mongoUrl = config.mongoUrl;
const client = new MongoClient(mongoUrl);
let tasksCollection;
let usersCollection;
let articlesCollection;

async function dbConnect() {
  try {
    await client.connect();
    const db = client.db("site");
    tasksCollection = db.collection("tasks");
    usersCollection = db.collection("users");
    articlesCollection = db.collection("articles");

    console.log("MongoDB connected");

    return { db, client, tasksCollection, usersCollection, articlesCollection };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = {
  dbConnect,
  mongoUrl,
};
