require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

//plug in the promise library
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.on("error", (error) => console.error(error));
connection.once("open", () =>
  console.log("Database connection established successfully")
);
connection.once("disconnected", () =>
  console.log("Mongoose connection is disconnected")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connection;
