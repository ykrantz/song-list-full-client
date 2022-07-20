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
import getPlaylistVideoFromServer from "./actions/getData/getPlaylistVideo";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import HandleVideoSrc from "./context/handleVideoSrc";
import initConnectToServer from "./actions/getData/initConnectToServer";
import HandleSearchResults from "./context/handleSearchResults";
import { initSearchApiResults } from "./utils/main_var";

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage?.currentUser ? JSON.parse(localStorage?.currentUser) : ""
  );
  const [currentPlaylist, setCurrentPlaylist] = useState(
    localStorage?.currentPlaylist
      ? JSON.parse(localStorage?.currentPlaylist)
      : ""
  );
  const [message, setMessage] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [favoritePlaylist, setFavoritePlaylist] = useState([]);
  const [videoSrc, setVideoSrc] = useState(
    localStorage?.youtubeId
      ? {
          type: "video",
          sources: [
            {
              src: JSON.parse(localStorage?.youtubeId),
              provider: "youtube",
            },
          ],
        }
      : ""
  );
  const [searchVideoResults, setSearchVideoResults] = useState(
    localStorage?.searchVideoApiResults?.length
      ? JSON.parse(localStorage?.searchVideoApiResults)
      : initSearchApiResults
  );
  const [searchPlaylistResults, setPlaylistResults] = useState([]);
  // const [autoPlayFlag, setAutoPlayFlag] = useState(false);
  const updateVideoSource = (videoId) => {
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

  const checkConnectionStatus = async () => {
    const connectionStatus = await initConnectToServer();
    if (connectionStatus?.status !== 200) {
      changeMessage(connectionStatus?.message, "error");
    }
  };

  return (
    <div className="App">
      <HandleUser.Provider
        value={{
          currentUser,
          setCurrentUser,
          handleSetCurrentUser,
          checkConnectionStatus,
        }}
      >
        <HandleVideoSrc.Provider
          value={{
            videoSrc,
            updateVideoSource,
            setVideoSrc,
            // autoPlayFlag,
            // setAutoPlayFlag,
          }}
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
              <HandleSearchResults.Provider
                value={{
                  searchVideoResults,
                  setSearchVideoResults,
                  searchPlaylistResults,
                  setPlaylistResults,
                }}
              >
                <Router>
                  <Routes>
                    <Route exact path="/" element={<SearchVideoPage />} />
                    <Route
                      exact
                      path="/playlists"
                      element={<PlaylistsPage />}
                    />
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
              </HandleSearchResults.Provider>
            </HandlePlaylistMainState.Provider>
          </HandleMessage.Provider>
        </HandleVideoSrc.Provider>
      </HandleUser.Provider>
    </div>
  );
}

export default App;
