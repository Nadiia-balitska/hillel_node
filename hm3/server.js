const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3050;

const logRequest = (req) => {
  const logLine = `${Date.now()} ${req.method} ${req.url}\n`;
  fs.appendFileSync("log.data", logLine);
};

const server = http.createServer((req, res) => {
  logRequest(req);

  if (req.method === "GET" && req.url === "/") {
    res.setHeader(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } else if (req.method === "GET" && req.url === "/about") {
    res.setHeader(200, { "Content-Type": "text/plain" });
    res.end("About Page");
  } else if (req.method === "POST" && req.url === "/echo") {
    res.setHeader(200, { "Content-Type": "text/plain" });
    res.end(Date.now().toString());
  } else if (req.method === "GET" && req.url === "/htmlfile") {
    const filePath = path.join(__dirname, "public", "file.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.setHeader(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/image") {
    const filePath = path.join(__dirname, "public", "image.png");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.setHeader(200, { "Content-Type": "image/png" });
        res.end(data);
      }
    });
  } else {
    res.setHeader(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
