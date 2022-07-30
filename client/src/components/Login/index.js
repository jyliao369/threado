import React from "react";
import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const loginUser = () => {
    Axios.post(`https://threado-server.herokuapp.com/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      console.log(response);
    });
  };

  const logoutUser = () => {
    Axios.get(`https://threado-server.herokuapp.com/logout`, {}).then(
      (response) => {
        console.log(response);
      }
    );
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
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Login;
