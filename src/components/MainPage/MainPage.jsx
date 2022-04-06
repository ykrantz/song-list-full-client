import "./MainPage.css";
import { useState } from "react";
import { useEffect } from "react";
import handleMainStates from "../../context/handleMainStates";
import Header from "./Header/Header";

import PlayList from "./PlayList/PlayList";
import PlayListsUser from "./PlayListsUser/PlayListsUser";

import SearchSongs from "./SearchSongs/SearchSongs";
import FoundedSongsYouTube from "./FoundedSongsYouTube/FoundedSongsYouTube";
import FoundedSongsPlaylist from "./FoundedSongsPlaylist/FoundedSongsPlaylist";
import handlePlaylist from "../../context/handlePlaylist";
import handleSearchSongApi from "../../context/handleSearchSongApi";
import handleSerachSongPlayList from "../../context/handleSerachSongPlayList";
import BASE_URL from "../../general/main_var";
import MessageNote from "../generalComponents/MessageNote/MessageNote";
import Body from "./Body/Body";

const MainPage = () => {
  const [searchSongApiResults, setSearchSongApiResults] = useState([]);
  const [searchPlaylistResults, setSearchPlaylistResults] = useState([]);
  const [newPlayList, setNewPlayList] = useState([]);
  const [userPlayLists, setUserPlayLists] = useState([]);
  const [currentPlayList, setCurrentPlayList] = useState("");
  const [message, setMessage] = useState("");
  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );

  return (
    <div className="MainPage">
      <div className="MainPage-container">
        {/* <BackToHome /> */}
        <br></br>
        <handleMainStates.Provider
          value={{
            searchSongApiResults,
            setSearchSongApiResults,
            searchPlaylistResults,
            setSearchPlaylistResults,
            newPlayList,
            setNewPlayList,
            userPlayLists,
            setUserPlayLists,
            currentPlayList,
            setCurrentPlayList,
            videoSrc,
            setVideoSrc,
          }}
        >
          <Header className="MainPage-header" />
          <Body className="MainPage-body" />
        </handleMainStates.Provider>
        <div className="MainPage-footer"></div>
      </div>
    </div>
  );
};

export default MainPage;
