const config = require("config");
const app = require("../app");

const debugServer = require("debug")("app:server");

app.listen(config.port, () =>
  debugServer(`express work on: http://localhost:${config.port}`)
);
