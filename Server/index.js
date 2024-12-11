const fs = require("fs");

const text = fs.readFileSync("./txt/test.txt", "utf-8");

const text2 = `The content of this file is: ${text}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", text2);
console.log(text);
