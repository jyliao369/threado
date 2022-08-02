import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setCurrentUser, setIsLoggedIn }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const loginUser = () => {
    Axios.post(`https://threado-server.herokuapp.com/login`, {
      loginEmail: loginEmail,
      loginPass: loginPass,
    }).then((response) => {
      if (response.data.message) {
      } else {
        console.log(response.data);
        setCurrentUser(response.data[0]);
        setIsLoggedIn(true);
      }
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
        type={"password"}
      />
      <button onClick={loginUser}>Login</button>
      <button onClick={logoutUser}>Logout</button>
      <p>Don't have an account?</p>
      <Link to={"/register"}>
        <p>Click here to create one</p>
      </Link>
    </div>
  );
};

export default Login;
