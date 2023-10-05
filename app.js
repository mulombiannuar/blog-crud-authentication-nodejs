const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");

const PageRouter = require("./routes/PageRouter");
const BlogRouter = require("./routes/BlogRouter");
const UserRouter = require("./routes/UserRouter");
const AuthRouter = require("./routes/AuthRouter");

const app = express();

const { verifyAccessToken } = require("./helpers/jwt");

//database initialization
require("./config/database");

//redis initialization
require("./config/redis");

// Middleware

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialDir: __dirname + "/views/partials/",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", PageRouter);
app.use("/auth", AuthRouter);
app.use("/blog", verifyAccessToken, BlogRouter);
app.use("/users", verifyAccessToken, UserRouter);

module.exports = app;
