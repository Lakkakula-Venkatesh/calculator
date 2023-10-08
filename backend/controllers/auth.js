const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const tokenSecret = "SecreT";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
};

const register = async (req, res) => {
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

    const payload = {
      id: savedUser.id,
      email: savedUser.email
    }
    res.status(200).send({
      user: savedUser,
      message: "User was succesfully Created",
      token: generateWebToken(payload)
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error creating user" });
  }
};

const generateWebToken = data =>
  jwt.sign(data, tokenSecret, { expiresIn: "24h" });

module.exports = {
  login,
  register
};
