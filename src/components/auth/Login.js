import axios from "axios";
import React from "react";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const verifyUser = () => {
    const userData = {
      email: email,
      password: password
    };
    axios
      .post("http://localhost:8000/login", userData)
      .then(res => (document.cookie = `token=${res.data.token}`))
      .then(res => console.log(res));
  };
  return (
    <>
      <label>Email ID: </label>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={() => verifyUser()}>Log in</button>
    </>
  );
}
