import React from "react";
import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const loginUser = () => {
    console.log(loginEmail + " " + loginPass);
    Axios.post(`http://localhost:3001/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login">
      <p>Login</p>
      <input
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={loginPass}
        onChange={(e) => setLoginPass(e.target.value)}
        placeholder="Password"
      />
      <button onClick={loginUser}>Login</button>
    </div>
  );
};

export default Login;
