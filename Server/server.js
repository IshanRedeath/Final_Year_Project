const dotenv = require("dotenv");
const mongoose = require("mongoose");

//handle synchrounus errors,(exception) that are not caught
//uncaughtException handling should run at the beginning before any other code because it is catching the errors before they are thrown
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./app");
dotenv.config({ path: "./config.env" }); // load environment variables from config.env to process.env

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connected successfully.");
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});

//handle async unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
