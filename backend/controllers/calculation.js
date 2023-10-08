const Operation = require('../models/operation');
const jwt = require("jsonwebtoken");
const tokenSecret = "SecreT";

const add = async (req, res) => {
  try {
    const { operandOne, operandTwo } = req.body;
    const fetchedUserId = decryptWebToken(req.headers.token).id;
    const sum = parseInt(operandOne) + parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "+",
      userId: parseInt(fetchedUserId),
      result: parseInt(sum)
    });

    await newOperation.save();

    res.status(200).send({ result: sum });
  } catch (err) {
    res.status(400).send(err);
  }
};

const subtract = async (req, res) => {
  try {
    const { operandOne, operandTwo } = req.body;
    const fetchedUserId = decryptWebToken(req.headers.token).id;
    const difference = parseInt(operandOne) - parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "-",
      userId: parseInt(fetchedUserId),
      result: parseInt(difference)
    });

    await newOperation.save();

    res.status(200).send({ result: difference });
  } catch (err) {
    console.log(res);
    res.status(400).send(err);
  }
};

const multiply = async (req, res) => {
  try {
    const { operandOne, operandTwo } = req.body;
    const fetchedUserId = decryptWebToken(req.headers.token).id;
    const product = parseInt(operandOne) * parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "*",
      userId: parseInt(fetchedUserId),
      result: parseInt(product)
    });

    await newOperation.save();

    res.status(200).send({ result: product });
  } catch (err) {
    console.log(res);
    res.status(400).send(err);
  }
};

const divide = async (req, res) => {
  try {
    const { operandOne, operandTwo } = req.body;
    const fetchedUserId = decryptWebToken(req.headers.token).id;
    const result = parseInt(operandOne) / parseInt(operandTwo);

    const newOperation = new Operation({
      operandOne: parseInt(operandOne),
      operandTwo: parseInt(operandTwo),
      calculation: "/",
      userId: parseInt(fetchedUserId),
      result: parseInt(result)
    });

    await newOperation.save();

    res.status(200).send({ result: result });
  } catch (err) {
    console.log(res);
    res.status(400).send(err);
  }
};

const calculationData = async (req, res) => {
  try {
    const fetchedUserId = decryptWebToken(req.headers.token).id;

    const data = await Operation.find({ userId: parseInt(fetchedUserId) });

    res.status(200).send({ operations: data });
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch data" });
  }
}

const decryptWebToken = str => jwt.verify(str, tokenSecret);

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculationData
};
