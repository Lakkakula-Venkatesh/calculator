import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/main/Navbar";
import Home from "./components/main/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Add from "./components/operations/Add";
import Difference from "./components/operations/Difference";
import Multiplication from "./components/operations/Multiplication";
import Division from "./components/operations/Division";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/difference" element={<Difference />} />
          <Route path="/multiplication" element={<Multiplication />} />
          <Route path="/division" element={<Division />} />
          <Route path="/division" element={<Division />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
