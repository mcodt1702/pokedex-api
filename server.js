const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("custom"));

app.use((req, res) => {
  res.send("hello world");
});

const PORT = 8000;

app.listen(PORT, () => console.log("server listening on port 8000"));

console.log("hello");
