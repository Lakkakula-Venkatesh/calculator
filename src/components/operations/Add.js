import React from "react";
import axios from "axios";

export default function Add() {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [result, setResult] = React.useState(0);

  const fetchResult = () => {
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    axios
      .post("http://localhost:8000/add", params)
      .then(res => setResult(res.data.result));
  };

  return (
    <>
      <h1>Addition</h1>
      <input value={operandOne} onChange={e => setOperandOne(e.target.value)} />
      <input value={operandTwo} onChange={e => setOperandTwo(e.target.value)} />
      <button onClick={() => fetchResult()}>Add</button>
      {operandOne > 0 && operandTwo > 0 && (
        <div>
          The sum of {operandOne} and {operandTwo} is {result}
        </div>
      )}
    </>
  );
}