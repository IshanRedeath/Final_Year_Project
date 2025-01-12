const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const app = express();

// const http = require("http");
// const app2 = http
//   .createServer((req, res) => {
//     res.write("hello from server");
//     res.end();
//   })
//   .listen(3001);

// const fs = require("fs");
// const text = fs.readFileSync("./txt/test.txt", "utf-8");
// const text2 = `The content of this file is: ${text}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", text2);
// console.log(text);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use("/users", userRouter);

module.exports = app;
