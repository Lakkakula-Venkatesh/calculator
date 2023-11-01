import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import Home from "../main/Home";

export default function Login({ updateAuthStatus, isAuthenticated }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (isAuthenticated) {
    window.history.pushState({}, "", "/");
    return <Home />;
  }

  const verifyUser = async e => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password
      })
      .then(res => {
        Cookies.set("token", res.data.token);
        updateAuthStatus(true);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="auth-form">
      <form onSubmit={verifyUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="current-password"
            autoComplete="on"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
