import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const NavBar = ({ isLoggedIn, setIsLoggedIn, setCurrentUser }) => {
  const logoutUser = () => {
    Axios.get(`https://threado-server.herokuapp.com/logout`, {}).then(() => {
      // console.log(response);
      setIsLoggedIn(false);
      setCurrentUser([]);
    });
  };

  return (
    <div className="navbar">
      <p>NavBar</p>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/explore">
        <p>Explore</p>
      </Link>
      <Link to="/subthreads">
        <p>Threads</p>
      </Link>

      {isLoggedIn === false ? (
        <>
          <Link to="/login">
            <p>Login</p>
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile">
            <p>Profile</p>
          </Link>
          <Link to="/bookmark">
            <p>Bookmark</p>
          </Link>
          <Link to="/settings">
            <p>Settings</p>
          </Link>
          <p onClick={logoutUser}>Logout</p>
        </>
      )}

      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  );
};

export default NavBar;
