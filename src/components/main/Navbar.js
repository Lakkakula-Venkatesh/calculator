import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link to="/add">Add</Link>
      <Link to="/difference">Difference</Link>
      <Link to="/multiplication">Multiplication</Link>
      <Link to="/division">Division</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </>
  );
}