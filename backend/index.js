const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.post("/add", (req, res) => {
  let operandOne = parseInt(req.body.operandOne);
  let operandTwo = parseInt(req.body.operandTwo);

  let sum = operandOne + operandTwo;
  res.send({ result: sum });
});

app.post("/difference", (req, res) => {
  let operandOne = parseInt(req.body.operandOne);
  let operandTwo = parseInt(req.body.operandTwo);

  let difference = operandOne - operandTwo;
  res.send({ result: difference });
});

app.post("/multiplication", (req, res) => {
  let operandOne = parseInt(req.body.operandOne);
  let operandTwo = parseInt(req.body.operandTwo);

  let product = operandOne * operandTwo;
  res.send({ result: product });
});

app.post("/divide", (req, res) => {
  let operandOne = parseInt(req.body.operandOne);
  let operandTwo = parseInt(req.body.operandTwo);

  let dividend = operandOne / operandTwo;
  res.send({ result: dividend });
});
let users = [];
app.post("/signup", (req, res) => {
  users.push(req.body);
  console.log(users);
  res.send({ code: 200 });
});

app.listen("8000", () => {
  console.log("Server listening at 8000");
});
