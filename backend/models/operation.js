const mongoose = require("mongoose");

const operationSchema = mongoose.Schema({
  operandOne: { type: Number, required: true },
  operandTwo: { type: Number, required: true },
  calculation: { type: String, required: true },
  result: { type: Number, default: 0 },
  userId: { type: Number }
});

module.exports = mongoose.model("Operation", operationSchema);
