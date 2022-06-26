import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "plyr-react/dist/plyr.css";
// import MainPage from "./components/MainPage/MainPage";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import handleUser from "./context/handleUser";
import { useState } from "react";
// import MainPage from "./components/MainPage/MainPage";
import MainPage from "./components/MainPage/MainPage";
import UserFavoriteList from "./components/UserFavoriteList/UserFavoriteList";
import SearchVideoPage from "./pages/SearchVideoPage/SearchVideoPage";
import PlaylistsPage from "./pages/PlaylistsPage/PlaylistsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import HandlePlaylistMainState from "./context/handlePlaylistMainState";
import HandleMessage from "./context/handleMessage";
import HandleUser from "./context/handleUser";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [message, setMessage] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);

  const changeMessage = (str, isEror = false) => {
    setMessage({ message: str, isEror: isEror });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <div className="App">
      <HandleUser.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <HandleMessage.Provider value={{ message, setMessage, changeMessage }}>
          <HandlePlaylistMainState.Provider
            value={{
              currentPlaylist,
              setCurrentPlaylist,
              userPlaylists,
              setUserPlaylists,
            }}
          >
            <Router>
              <Routes>
                {/* <Route exact path="/" element={<LogIn />} /> */}
                {/* <Route exact path="/" element={<p>dd</p>} /> */}
                {/* <Route exact path="/" element={<MainPage />} /> */}

                <Route exact path="/" element={<SearchVideoPage />} />
                {/* <Route exact path="/" element={<Register />} /> */}
                <Route exact path="/playlists" element={<PlaylistsPage />} />
                <Route exact path="/search" element={<SearchVideoPage />} />

                <Route exact path="/about" element={<AboutPage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<LogIn />} />
                <Route
                  exact
                  path="/songfavorites/:songid"
                  element={<UserFavoriteList />}
                />
              </Routes>
            </Router>
          </HandlePlaylistMainState.Provider>
        </HandleMessage.Provider>
      </HandleUser.Provider>
      {/* <MainPage></MainPage> */}
    </div>
  );
}

export default App;
