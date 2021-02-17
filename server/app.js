/* eslint-disable no-console */

const http = require("http");
const path = require("path");
const notifier = require("node-notifier");

const express = require("./express");

const server = http.createServer(express.app);

server.listen(3000, function() {
  notifier.notify({
    title: "Node.js server",
    message: "Server listening at port 3000",
    icon: path.resolve(__dirname, "node.png")
  });
});
