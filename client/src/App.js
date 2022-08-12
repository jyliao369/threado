import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import NavBar from "./components/NavBar";
import ShowPost from "./components/ShowPost";
import RandomNews from "./components/RandomNews";
import Explore from "./components/Explore";
import Bookmark from "./components/Bookmark";
import Login from "./components/Login";
import Register from "./components/Register";
import MyThreads from "./components/MyThreads";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import SinglePost from "./components/SinglePost";
import SubThreads from "./components/SubThreads";
import SubThreadsPage from "./components/SubThreadsPage";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://threado-server.herokuapp.com/login`, {}).then(
      (response) => {
        if (response.data.loggedIn === true) {
          console.log("Session is in session");
          console.log(response.data);
          setIsLoggedIn(response.data.isLogged);
          setCurrentUser(response.data.user[0]);
        }
      }
    );
  }, []);

  return (
    <Router basename="/threado">
      <div className="appCont">
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <div className="mainPage">
          <Routes>
            <Route
              path="/threado"
              element={
                <>
                  <ShowPost />
                </>
              }
            />
            <Route
              path="/explore"
              element={
                <>
                  <Explore />
                </>
              }
            />
            <Route
              path="/subthreads"
              element={
                <>
                  <SubThreads
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
                </>
              }
            />
            <Route
              path="/profile/:userID"
              element={
                <>
                  <Profile currentUser={currentUser} />
                </>
              }
            />
            <Route
              path="/bookmark/:userID"
              element={
                <>
                  <Bookmark currentUser={currentUser} />
                </>
              }
            />
            <Route
              path="/mythreads/:userID"
              element={
                <>
                  <MyThreads />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Settings currentUser={currentUser} />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Register
                    setCurrentUser={setCurrentUser}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </>
              }
            />

            <Route
              path="/subthread/:subthreadID"
              element={
                <>
                  <SubThreadsPage
                    currentUser={currentUser}
                    isLoggedIn={isLoggedIn}
                  />
                </>
              }
            />
            <Route
              path="/post/:postID"
              element={
                <>
                  <SinglePost
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                  />
                </>
              }
            />
          </Routes>
        </div>

        <RandomNews />
      </div>
    </Router>
  );
}

export default App;
