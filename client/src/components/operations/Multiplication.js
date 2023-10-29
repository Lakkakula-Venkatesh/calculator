import React from "react";
import axios from "axios";
import CalculatedData from "../main/CalculatedData";
import Cookies from "js-cookie";
import TwoFieldInput from "./TwoFieldInput";

export default function Multiplication({ isAuthenticated }) {
  const [operandOne, setOperandOne] = React.useState(0);
  const [operandTwo, setOperandTwo] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(0);
  const [newData, setNewData] = React.useState(true);

  const fetchResult = e => {
    e.preventDefault();

    const storedToken = Cookies.get("token");
    const params = {
      operandOne: operandOne,
      operandTwo: operandTwo
    };
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/calculation/multiplication`,
        params,
        {
          headers: {
            token: storedToken
          }
        }
      )
      .then(res => {
        setResult(res.data.result);
        setNewData(false);
      })
      .then(() => setLoading(false));
  };

  return (
    <>
      <h1>Multiplication</h1>
      <TwoFieldInput
        operandOne={operandOne}
        operandTwo={operandTwo}
        updateOperandOne={e => {
          if (!newData) setNewData(true);
          setOperandOne(e.target.value);
        }}
        updateOperandTwo={e => {
          if (!newData) setNewData(true);
          setOperandTwo(e.target.value);
        }}
      />
      <button className="btn btn-primary" onClick={e => fetchResult(e)}>
        Multiplication
      </button>
      {!loading && !newData && (
        <div>
          The product of {operandOne} and {operandTwo} is {result}
        </div>
      )}
      {!loading && <CalculatedData />}
    </>
  );
}
