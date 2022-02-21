import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "plyr-react/dist/plyr.css";
// import MainPage from "./components/MainPage/MainPage";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import handleUser from "./context/handleUser";
import { useState } from "react/cjs/react.development";
// import MainPage from "./components/MainPage/MainPage";
import MainPage from "./components/MainPage/MainPage";
import UserFavoriteList from "./components/UserFavoriteList/UserFavoriteList";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div className="App">
      <handleUser.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Router>
          <Routes>
            {/* <Route exact path="/" element={<LogIn />} /> */}
            {/* <Route exact path="/" element={<p>dd</p>} /> */}
            <Route exact path="/" element={<MainPage />} />
            {/* <Route exact path="/" element={<Register />} /> */}
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route
              exact
              path="/songfavorites/:songid"
              element={<UserFavoriteList />}
            />
          </Routes>
        </Router>
      </handleUser.Provider>
      {/* <MainPage></MainPage> */}
    </div>
  );
}

export default App;
