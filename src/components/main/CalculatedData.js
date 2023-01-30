import axios from "axios";
import { useEffect, useState } from "react";

export default function CalculatedData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/calculation_data")
      .then(res => {
        if (loading) setData(res.data.operations);
      })
      .then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((ele, index) => (
            <div key={index}>
              {ele.operandOne} {ele.calculation} {ele.operandTwo} = {ele.result}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
