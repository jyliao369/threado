import React from "react";
import { useState } from "react";
import Axios from "axios";

const Register = ({ setIsLoggedIn, setCurrentUser }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const registerUser = () => {
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
      });
    });
  };

  return (
    <div className="register">
      <p>Register</p>
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        placeholder="Re-Type Password"
      />
      <button
        value={[lastName, firstName, username, email, password, rePassword]}
        onClick={(e) => registerUser(e.target.value)}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
