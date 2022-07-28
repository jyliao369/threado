import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import ShowPost from "./components/ShowPost";
import RandomNews from "./components/RandomNews";
import Explore from "./components/Explore";

function App() {
  return (
    <Router>
      <div className="appCont">
        <NavBar />
        <div className="mainPage">
          <Routes>
            <Route
              path="/"
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
              path="/explore"
              element={
                <>
                  <Explore />
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
              path="/explore"
              element={
                <>
                  <Explore />
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
              path="/explore"
              element={
                <>
                  <Explore />
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
