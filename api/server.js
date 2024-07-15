const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "..", "Data", "db.json")); // تعديل المسار لمجلد Data
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
