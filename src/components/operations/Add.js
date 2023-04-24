import React, { useState } from "react";
import axios from "axios";
import CalculatedData from "../main/CalculatedData";

export default function Add() {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = React.useState(0);

  const fetchResult = () => {
    const storedToken = document.cookie.split('token=')[1];
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    axios
      .post("http://localhost:8000/add", params, {
        headers: {
          'token': storedToken
        }
      })
      .then(res => setResult(res.data.result))
      .then(() => setLoading(false));
  };

  return (
    <>
      <h1>Addition</h1>
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
      <button onClick={() => fetchResult()}>Add</button>
      {!loading && (
        <div>
          The sum of {operandOne} and {operandTwo} is {result}
        </div>
      )}
      <CalculatedData />
    </>
  );
}
