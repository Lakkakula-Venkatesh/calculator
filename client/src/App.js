import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/main/Navbar";
import Home from "./components/main/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Add from "./components/operations/Add";
import Difference from "./components/operations/Difference";
import Multiplication from "./components/operations/Multiplication";
import Division from "./components/operations/Division";
import Cookies from "js-cookie";
import CalculatedData from "./components/main/CalculatedData";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const updateAuthStatus = authStatus => {
    setIsAuthenticated(authStatus);
  };

  useEffect(() => {
    if (Cookies.get("token") != null) setIsAuthenticated(true);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          updateAuthStatus={authStatus => updateAuthStatus(authStatus)}
        />
        <Routes>
          <Route
            path="/add"
            element={<Add isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/difference"
            element={<Difference isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/multiplication"
            element={<Multiplication isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/division"
            element={<Division isAuthenticated={isAuthenticated} />}
          />
          <Route path="/history" element={<CalculatedData />} />
          <Route
            path="/register"
            element={
              <Register
                updateAuthStatus={authStatus => updateAuthStatus(authStatus)}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                updateAuthStatus={authStatus => updateAuthStatus(authStatus)}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
