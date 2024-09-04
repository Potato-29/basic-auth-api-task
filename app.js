var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotnev = require("dotenv");

dotnev.config();

var indexRouter = require("./api/index");
var authRouter = require("./api/router/auth.router");
const connectDB = require("./api/config/mongodb");
const { errorHandler } = require("./api/middleware/error.middleware");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});

module.exports = app;
