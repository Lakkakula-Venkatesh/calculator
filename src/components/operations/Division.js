import React from "react";
import axios from "axios";

export default function Division() {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [result, setResult] = React.useState(0);

  const fetchResult = () => {
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    axios
      .post("http://localhost:8000/divide", params)
      .then(res => setResult(res.data.result));
  };

  return (
    <>
      <h1>Division</h1>
      <input value={operandOne} onChange={e => setOperandOne(e.target.value)} />
      <input value={operandTwo} onChange={e => setOperandTwo(e.target.value)} />
      <button onClick={() => fetchResult()}>Division</button>
      {operandOne > 0 && operandTwo > 0 && (
        <div>
          The result of {operandOne} and {operandTwo} is {result}
        </div>
      )}
    </>
  );
}