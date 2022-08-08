import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

const Settings = ({ currentUser }) => {
  const [usernameUpdate, setUsernameUpdate] = useState(currentUser.username);
  const [lastUpdate, setLastUpdate] = useState(currentUser.lastName);
  const [firstUpdate, setFirstUpdate] = useState(currentUser.firstName);
  const [emailUpdate, setEmailUpdate] = useState(currentUser.email);

  const [newPass, setNewPass] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");

  const updatePass = () => {
    if (newPass === "" && checkNewPass === "") {
      console.log("No password provided");
    } else if (newPass !== checkNewPass) {
      console.log("Passwords dont match");
    } else {
      // console.log("Passwords match");
      Axios.put(
        `https://threado-server.herokuapp.com/updatePass/${currentUser.userID}`,
        {
          newPass: newPass,
        }
      ).then((response) => {
        console.log(response);
      });
    }
  };

  const updateProfile = () => {
    if (
      usernameUpdate === "" ||
      lastUpdate === "" ||
      firstUpdate === "" ||
      emailUpdate === ""
    ) {
      console.log("missing info");
    } else {
      console.log(usernameUpdate);
      console.log(lastUpdate);
      console.log(firstUpdate);
      console.log(emailUpdate);
      Axios.put(
        `https://threado-server.herokuapp.com/updateProfile/${currentUser.userID}`,
        {
          usernameUpdate: usernameUpdate,
          lastUpdate: lastUpdate,
          firstUpdate: firstUpdate,
          emailUpdate: emailUpdate,
        }
      ).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <div className="settingsPage">
      <div className="accountBanner">
        <div className="banner"></div>
        <div className="account">
          <div>
            <div className="accountIcon" />
            <h2>{currentUser.username}</h2>
            <h3>{currentUser.email}</h3>
          </div>
        </div>
      </div>

      <div className="updateFormBorder">
        <div className="updateFormBody">
          <div className="userUpdate">
            <h3>Update Profile</h3>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="Username"
                  value={usernameUpdate}
                  onChange={(e) => setUsernameUpdate(e.target.value)}
                />
              </div>
            </div>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="Last Name"
                  value={lastUpdate}
                  onChange={(e) => setLastUpdate(e.target.value)}
                />
              </div>
            </div>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="First Name"
                  value={firstUpdate}
                  onChange={(e) => setFirstUpdate(e.target.value)}
                />
              </div>
            </div>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="Email"
                  value={emailUpdate}
                  onChange={(e) => setEmailUpdate(e.target.value)}
                />
              </div>
            </div>
            <button onClick={() => updateProfile()}>Update</button>
          </div>

          <div className="passUpdate">
            <h3>Update Password</h3>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="New Password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  type={"password"}
                />
              </div>
            </div>
            <div className="inputBorder">
              <div className="inputBody">
                <input
                  placeholder="Re-Type Password"
                  value={checkNewPass}
                  onChange={(e) => setCheckNewPass(e.target.value)}
                  type={"password"}
                />
              </div>
            </div>
            <button onClick={() => updatePass()}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
