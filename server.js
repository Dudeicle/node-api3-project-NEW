const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Importing files
const apiRouter = require("./api/router.js");

// server = express
const server = express();

// Global middleware
server.use(cors());
server.use(express.json());
server.use(helmet());

server.use(logger);

server.use("/api", logger, apiRouter);
// ex url
// localhost:5000/api/ +apiRouter
// /users/ + userRouter
// --- localhost:5000/api/users/ +routes from userRouter

server.get("/", (req, res) => {
	res.send(`<h2>API UP!</h2>`);
});

//custom middleware
function logger(req, res, next) {
	req.name = req.headers.name;

	console.log(`${req.name} made a ${req.method} request to ${req.url}`);

	next();
}

module.exports = server;
