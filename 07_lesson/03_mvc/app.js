const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

const messageRoutes = require("./routes/messageRoutes.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

//controller(resend information to controller)
app.use("/", messageRoutes);

app.listen(PORT, () => console.log("work"));
