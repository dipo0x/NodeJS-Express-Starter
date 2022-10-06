const path = require("path");
const bunyan = require("bunyan");
const Mask = require("./mask");
const level = process.env.NODE_LOGGING_LEVEL || "info";

const log = bunyan.createLogger({
  name: "boilerPlate",
  streams: [
    {
      level,
      stream: process.stdout
    },
    {
      level,
      path: path.resolve(__dirname, "..", "logs.json")
    }
  ]
});

module.exports = new Mask(log);