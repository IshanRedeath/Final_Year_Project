const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const testRouter = require("./routes/testRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const rolesRouter = require("./routes/rolesRoutes");
const errorHandler = require("./controllers/errorController");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/users", userRouter);
app.use("/tests", testRouter);
app.use("/employees", employeeRouter);
app.use("/roles", rolesRouter);

app.use(errorHandler); // handle error response

module.exports = app;
