const express = require("express");
const connectToMongo = require("./connection");
const logData = require("./middlewares");
const cookieParser = require("cookie-parser");
const path = require("path");
const {restrictToAuthenticatedUserOnly} = require('./middlewares/auth');

//Routers
const urlRouter = require("./routers/url");
const userRouter = require("./routers/user");

//
const app = express();
const port = 3000;

//connection to mongo
connectToMongo("mongodb://127.0.0.1:27017/url-shortener");

//middlewares (plugins)
app.use(express.urlencoded({ extended: false })); //used to parse data received in www.form-urlencoded
app.use(express.json()); // used to parse json data
app.use(cookieParser());
app.use(logData("./log.txt"));

//default javascript template
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routers (order matter here)
app.use("/users", userRouter);
app.use("/",restrictToAuthenticatedUserOnly,urlRouter);

app.listen(port, () =>
    console.log(`connected to port ${port}`)
);
