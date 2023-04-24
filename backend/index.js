const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Operation = require("./models/operation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const tokenSecret = "SecreT";
const middleware = require("./middleware");

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
    const { operandOne, operandTwo } = req.body;
    const fetchedUserId = decryptWebToken(req.headers.token);
    const sum = parseInt(operandOne) + parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "+",
      userId: parseInt(fetchedUserId),
      result: parseInt(sum)
    });
    console.log(newOperation, "newOperation");
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

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hash
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
    const fetchedUserId = decryptWebToken(req.headers.token);

    const data = await Operation.find({ userId: parseInt(fetchedUserId) });

    res.status(200).send({ operations: data });
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch data" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "credentials");
    const user = await User.findOne({ email: email });

    if (user == null) {
      res.status(400).send({ message: "User not yet registered" });
    }

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (correctPassword) {
      const payload = {
        id: user.id,
        email: user.email
      };

      res.status(200).send({
        message: "User succesfully logged in",
        token: generateWebToken(payload)
      });
    } else {
      res.status(401).send({ message: "Password entered is incorrect" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unable to fetch user data" });
  }
});

const generateWebToken = data =>
  jwt.sign(data, tokenSecret, { expiresIn: "24h" });

const decryptWebToken = str => jwt.verify(str, tokenSecret).id;

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
