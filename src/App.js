import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "plyr-react/dist/plyr.css";

import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import { useState } from "react";
import UserFavoriteList from "./components/UserFavoriteList/UserFavoriteList";
import SearchVideoPage from "./pages/SearchVideoPage/SearchVideoPage";
import PlaylistsPage from "./pages/PlaylistsPage/PlaylistsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import HandlePlaylistMainState from "./context/handlePlaylistMainState";
import HandleMessage from "./context/handleMessage";
import HandleUser from "./context/handleUser";
import getPlaylistVideoFromServer from "./controllers/getPlaylistVideo";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import HandleVideoSrc from "./context/handleVideoSrc";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.currentUser ? JSON.parse(localStorage.currentUser) : ""
  );
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [message, setMessage] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [favoritePlaylist, setFavoritePlaylist] = useState([]);
  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  const updateVideoSource = (videoId) => {
    // setAutoplayFlag(true);
    const youtubeId = videoId;

    setVideoSrc({
      type: "video",
      sources: [
        {
          src: youtubeId,
          provider: "youtube",
        },
      ],
    });
    localStorage.youtubeId = JSON.stringify(videoId);
  };

  const getFavoritePlaylistFromServer = async () => {
    const favorites = await getPlaylistVideoFromServer("My Favorites");
    setFavoritePlaylist(favorites);
  };

  const handleSetCurrentPlaylist = (value) => {
    localStorage.currentPlaylist = JSON.stringify(value);
    setCurrentPlaylist(value);
  };

  const handleSetCurrentUser = (value) => {
    localStorage.currentUser = JSON.stringify(value);
    setCurrentUser(value);
  };
  const changeMessage = (str, type = "success") => {
    setMessage({ message: str, type: type });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const waitingMessage = () => {
    changeMessage("Waiting for results from server", "info");
  };

  return (
    <div className="App">
      <HandleUser.Provider
        value={{
          currentUser,
          setCurrentUser,
          handleSetCurrentUser,
        }}
      >
        <HandleVideoSrc.Provider
          value={{ videoSrc, updateVideoSource, setVideoSrc }}
        >
          <HandleMessage.Provider
            value={{ message, setMessage, changeMessage, waitingMessage }}
          >
            <HandlePlaylistMainState.Provider
              value={{
                currentPlaylist,
                setCurrentPlaylist,
                handleSetCurrentPlaylist,
                userPlaylists,
                setUserPlaylists,
                favoritePlaylist,
                setFavoritePlaylist,
                getFavoritePlaylistFromServer,
              }}
            >
              <Router>
                <Routes>
                  <Route exact path="/" element={<SearchVideoPage />} />
                  <Route exact path="/playlists" element={<PlaylistsPage />} />
                  <Route exact path="/search" element={<SearchVideoPage />} />
                  <Route exact path="/favorites" element={<FavoritePage />} />
                  <Route exact path="/about" element={<AboutPage />} />
                  <Route
                    exact
                    path="/register"
                    element={<LoginRegisterPage type="register" />}
                  />
                  <Route
                    exact
                    path="/login"
                    element={<LoginRegisterPage type="logIn" />}
                  />
                  <Route
                    exact
                    path="/songfavorites/:songid"
                    element={<UserFavoriteList />}
                  />
                </Routes>
              </Router>
            </HandlePlaylistMainState.Provider>
          </HandleMessage.Provider>
        </HandleVideoSrc.Provider>
      </HandleUser.Provider>
    </div>
  );
}

export default App;
