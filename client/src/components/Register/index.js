import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn, setCurrentUser }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [regStatus, setRegStatus] = useState(" ");

  const navToProfile = useNavigate();

  const registerUser = () => {
    if (
      lastName === "" ||
      firstName === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      rePassword === ""
    ) {
      setRegStatus("Missing information");
    } else if (password !== rePassword) {
      setRegStatus("Passwords do not match!");
    } else {
      Axios.post("https://threado-server.herokuapp.com/registerUser", {
        lastName: lastName,
        firstName: firstName,
        username: username,
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
        Axios.post(`https://threado-server.herokuapp.com/login`, {
          loginEmail: email,
          loginPass: password,
        }).then((response) => {
          console.log("hellothere");
          // console.log(response.data[0]);
          setCurrentUser(response.data[0]);
          setIsLoggedIn(true);
          navToProfile("/profile");
        });
      });
    }
  };

  return (
    <div className="register">
      <div className="loginTitle">
        <h2>Register</h2>
      </div>

      <div className="regFormBorder">
        <div className="regFormBody">
          <div className="regFormPartCont">
            <div className="regFormPart">
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
              </div>
            </div>

            <div className="regFormPart">
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type={"password"}
                  />
                </div>
              </div>
              <div className="inputBorder">
                <div className="inputBody">
                  <input
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    placeholder="Re-Type Password"
                    type={"password"}
                  />
                </div>
              </div>
            </div>
          </div>

          <p>{regStatus}</p>

          <div className="regFormPartTwo">
            <button
              value={[
                lastName,
                firstName,
                username,
                email,
                password,
                rePassword,
              ]}
              onClick={(e) => registerUser(e.target.value)}
            >
              Register
            </button>
            <p>Already have an account?</p>
            <Link to={"/login"}>
              <p>Click here to log in</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
