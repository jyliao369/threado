import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import ShowPost from "./components/ShowPost";
import RandomNews from "./components/RandomNews";

function App() {
  return (
    <Router>
      <div className="appCont">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ShowPost />
              </>
            }
          />
        </Routes>
        <RandomNews />
      </div>
    </Router>
  );
}

export default App;
