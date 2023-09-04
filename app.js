const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");

const PageRouter = require("./routes/PageRouter");
const BlogRouter = require("./routes/BlogRouter");
const usersRouter = require("./routes/users");

const app = express();

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
app.use("/blog", BlogRouter);
app.use("/users", usersRouter);

module.exports = app;
