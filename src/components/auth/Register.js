import axios from "axios";
import React from "react";
import Home from "../main/Home";
import Cookie from "js-cookie";

export default function Register({ updateAuthStatus, isAuthenticated }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if(isAuthenticated) {
    window.history.pushState({}, "", '/')
    return <Home />;
  }

  const createUser = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password
    };
    axios
      .post("http://localhost:8000/api/auth/register", userData)
      .then(res => {
        Cookie.set('token', res.data.token)
        updateAuthStatus(true);
        window.history.pushState({}, "", '/');
      });
  };
  return (
    <div className="auth-form">
      <form onSubmit={createUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setName(e.target.value)}
          />
        </div>
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
            id="exampleInputPassword1"
            autoComplete="on"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
