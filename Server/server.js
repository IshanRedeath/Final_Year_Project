const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});
