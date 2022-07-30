import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      <Link to="/profile">
        <p>Profile</p>
      </Link>
      <Link to="/bookmark">
        <p>Bookmark</p>
      </Link>
      <Link to="/settings">
        <p>Settings</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
      <Link to="/register">
        <p>Register</p>
      </Link>
    </div>
  );
};

export default NavBar;
