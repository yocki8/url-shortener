const express = require("express");
const connectMongoDB = require("./connection");
const { logData } = require("./middlewares");
const urlRouter = require("./routers/short-url");
const path = require("path");
const PORT = 3000;
const app = express();



//connection
connectMongoDB("mongodb://127.0.0.1:27017/link-shortener");



//Middlewares-plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logData("log.txt"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", urlRouter);
app.listen(PORT, () =>
    console.log("server is started at " + PORT)
);
