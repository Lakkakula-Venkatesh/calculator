import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CalculatedData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedToken = Cookies.get("token");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/calculation/data`, {
        headers: {
          token: storedToken
        }
      })
      .then(res => {
        if (loading) setData(res.data.operations);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Calculation History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Operand</th>
              <th scope="col">Operator</th>
              <th scope="col">First Operand</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{ele.operandOne}</td>
                <td>{ele.calculation}</td>
                <td>{ele.operandTwo}</td>
                <td>{ele.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
