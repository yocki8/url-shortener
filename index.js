const express = require("express");
const connectToMongo = require("./connection");
const logData = require("./middlewares");
const path = require("path");
const ejs = require("ejs");

//Routers
const urlRouter = require("./routers/url");
const userRouter = require("./routers/user");

//
const app = express();
const port = 3000;

//connection to mongo
connectToMongo("mongodb://127.0.0.1:27017/");

//middlewares (plugins)
app.use(express.urlencoded({ extended: false })); //used to parse data received in www.form-urlencoded
app.use(express.json()); // used to parse json data
app.use(logData("./log.txt"));

//default javascript template
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routers (order matter here)
app.use("/users",userRouter);
app.use("/", urlRouter);

app.listen(port, () =>
    console.log(`connected to port ${port}`)
);
