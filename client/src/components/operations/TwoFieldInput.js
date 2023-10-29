export default function TwoFieldInput({
  operandOne,
  operandTwo,
  updateOperandOne,
  updateOperandTwo
}) {
  return (
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
          updateOperandOne(e);
        }}
      />
      <label>Second Number:</label>
      <input
        style={{ margin: "15px", width: "25%" }}
        className="form-control"
        value={operandTwo}
        onChange={e => {
          updateOperandTwo(e);
        }}
      />
    </div>
  );
}
