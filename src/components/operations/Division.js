import React from "react";
import axios from "axios";
import CalculatedData from "../main/CalculatedData";

export default function Division() {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState(0);

  const fetchResult = () => {
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    axios
      .post("http://localhost:8000/divide", params)
      .then(res => setResult(res.data.result))
      .then(() => setLoading(false));
  };

  return (
    <>
      <h1>Division</h1>
      <input
        value={operandOne}
        onChange={e => {
          setLoading(true);
          setOperandOne(e.target.value);
        }}
      />
      <input
        value={operandTwo}
        onChange={e => {
          setLoading(true);
          setOperandTwo(e.target.value);
        }}
      />
      <button onClick={() => fetchResult()}>Division</button>
      {!loading && (
        <div>
          The result of {operandOne} and {operandTwo} is {result}
        </div>
      )}
      <CalculatedData />
    </>
  );
}
