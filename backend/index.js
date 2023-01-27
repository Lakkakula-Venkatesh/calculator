const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose.set("strictQuery", false);
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

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error creating user" });
  }
});

app.listen("8000", () => {
  console.log("Server listening at 8000");
});

mongoose.connect(
  "mongodb+srv://Venkatesh:Venkatesh@cluster0.ym2ts75.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
