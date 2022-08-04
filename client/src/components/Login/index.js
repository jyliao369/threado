import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setCurrentUser, setIsLoggedIn }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const navToProfile = useNavigate();

  const loginUser = () => {
    if (loginEmail === "" && loginPass === "") {
      setLoginStatus("Invalid Password/Email Combination!");
    } else if (loginEmail === "") {
      setLoginStatus("Invalid Email!");
    } else if (loginPass === "") {
      setLoginStatus("Invalid Password!");
    } else {
      Axios.post(`https://threado-server.herokuapp.com/login`, {
        loginEmail: loginEmail,
        loginPass: loginPass,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          console.log(response.data);
          setCurrentUser(response.data[0]);
          setIsLoggedIn(true);
          navToProfile("/profile");
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="loginTitle">
        <h2>Login</h2>
      </div>

      <div className="loginFormBorder">
        <div className="loginFormBody">
          <div className="regFormPart">
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Password"
                  type={"password"}
                />
              </div>
            </div>
          </div>

          <p>{loginStatus}</p>

          <div className="regFormPart">
            <button onClick={loginUser}>Login</button>
            <p>Don't have an account?</p>
            <Link to={"/register"}>
              <p>Click here to create one</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
