const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Operation = require("./models/operation");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose.set("strictQuery", false);
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.post("/add", async (req, res) => {
  try {
    const { operandOne, operandTwo, userId } = req.body;

    const sum = parseInt(operandOne) + parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "+",
      userId: userId,
      result: parseInt(sum)
    });

    await newOperation.save();

    res.status(200).send({ result: sum });
  } catch (err) {
    console.log(res);
    res.status(400).send(err);
  }
});

app.post("/difference", (req, res) => {
  const { operandOne, operandTwo } = req.body;

  const difference = parseInt(operandOne) - parseInt(operandTwo);
  res.send({ result: difference });
});

app.post("/multiplication", (req, res) => {
  const { operandOne, operandTwo } = req.body;

  const product = parseInt(operandOne) * parseInt(operandTwo);
  res.send({ result: product });
});

app.post("/divide", (req, res) => {
  const { operandOne, operandTwo } = req.body;

  const dividend = parseInt(operandOne) / parseInt(operandTwo);
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

app.get("/calculation_data", async (req, res) => {
  try {
    const data = await Operation.find({ userId: "1" });

    res.status(200).send({ operations: data });
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch data" });
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
