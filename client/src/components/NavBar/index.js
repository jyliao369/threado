import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

const NavBar = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }) => {
  const logoutUser = () => {
    Axios.get(`https://threado-server.herokuapp.com/logout`, {}).then(() => {
      // console.log(response);
      setIsLoggedIn(false);
      setCurrentUser([]);
      navToHome("/");
    });
  };

  const navToHome = useNavigate();

  return (
    <div className="navbarPage">
      <div className="navbar">
        <p>ThreadOh!!</p>
        <Link to="/">
          <div>
            <HomeOutlinedIcon />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div>
            <ExploreOutlinedIcon />
            <p>Explore</p>
          </div>
        </Link>
        <Link to="/subthreads">
          <div>
            <FormatListBulletedOutlinedIcon />
            <p>Threads</p>
          </div>
        </Link>

        {isLoggedIn === false ? (
          <></>
        ) : (
          <>
            <Link to="/profile">
              <div>
                <AccountCircleOutlinedIcon />
                <p>Profile</p>
              </div>
            </Link>
            <Link to={`/bookmark/${currentUser.userID}`}>
              <div>
                <BookmarkBorderOutlinedIcon />
                <p>Bookmark</p>
              </div>
            </Link>
            <Link to={`/mythreads/${currentUser.userID}`}>
              <div>
                <ListAltOutlinedIcon />
                <p>My Threads</p>
              </div>
            </Link>
            <Link to="/settings">
              <div>
                <SettingsOutlinedIcon />
                <p>Settings</p>
              </div>
            </Link>
          </>
        )}
      </div>

      <div className="logRegBtn">
        {isLoggedIn === false ? (
          <Link to="/login">
            <div className="logReg">
              <LoginOutlinedIcon />
              <p>Login</p>
            </div>
          </Link>
        ) : (
          <div className="logReg" style={{ cursor: "pointer" }}>
            <LogoutOutlinedIcon />
            <p onClick={logoutUser}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
