const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Set-Cookie", "token=abc123;HttpOnly; Path=/");
  res.setHeader("Set-Cookie", "some_cookie=bbvbvm;HttpOnly; Path=/");
  console.log(req.headers.cookie);

  res.end("node js server");
});

server.listen(3100, () => {
  console.log(`server work on http://localhost:3100`);
});
