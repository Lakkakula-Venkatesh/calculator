import axios from "axios";
import React from "react";

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const createUser = () => {

    const userData = {
      name: name,
      email: email,
      password: password
    };
    axios
      .post("http://localhost:8000/signup", userData)
      .then(res => console.log(res));
  };
  return (
    <>
      <label>Name: </label>
      <input type="text" onChange={e => setName(e.target.value)} />
      <label>Email ID: </label>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={() => createUser()}>Sign up</button>
    </>
  );
}
