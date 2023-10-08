import React from "react";
import axios from "axios";
import CalculatedData from "../main/CalculatedData";

export default function Division({ isAuthenticated }) {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState(0);

  const fetchResult = e => {
    e.preventDefault();

    const storedToken = document.cookie.split("token=")[1];
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    axios
      .post("http://localhost:8000/api/calculation/division", params, {
        headers: {
          token: storedToken
        }
      })
      .then(res => {
        setResult(res.data.result);
      })
      .then(() => setLoading(false));
  };

  return (
    <>
      <h1>Division</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <label>First Number:</label>
        <input
          style={{ margin: "15px", width: "25%" }}
          className="form-control"
          value={operandOne}
          onChange={e => {
            setOperandOne(e.target.value);
          }}
        />
        <label>Second Number:</label>
        <input
          style={{ margin: "15px", width: "25%" }}
          className="form-control"
          value={operandTwo}
          onChange={e => {
            setOperandTwo(e.target.value);
          }}
        />
      </div>
      <button className="btn btn-primary" onClick={e => fetchResult(e)}>
        Division
      </button>
      {!loading && (
        <div>
          The result of {operandOne} and {operandTwo} is {result}
        </div>
      )}
      <CalculatedData />
    </>
  );
}
