import "./Body.css";
import { useContext, useState } from "react";
import { useEffect } from "react";

import PlayList from "./PlayList/PlayList";
import PlayListsUser from "./PlayListsUser/PlayListsUser";

import SearchSongs from "./SearchSongs/SearchSongs";
import FoundedSongsYouTube from "./FoundedSongsYouTube/FoundedSongsYouTube";
import FoundedSongsPlaylist from "./FoundedSongsPlaylist/FoundedSongsPlaylist";
import handlePlaylist from "../../../context/handlePlaylist";
import handleChangeMesage from "../../../context/handleChangeMesage";

import { BASE_URL } from "../../../general/main_var";
import MessageNote from "../../generalComponents/MessageNote/MessageNote";
import handleMainStates from "../../../context/handleMainStates";
const Body = () => {
  const {
    searchSongApiResults,
    searchPlaylistResults,
    newPlayList,
    setNewPlayList,
    userPlayLists,
    setUserPlayLists,
    currentPlayList,
    setCurrentPlayList,
    setVideoSrc,
  } = useContext(handleMainStates);

  const [message, setMessage] = useState("");

  // feture fot futere: autoplay
  // const [autoplayFlag, setAutoplayFlag] = useState(true);
  useEffect(() => {
    getPlaylistsUserFromServer();
  }, []);

  useEffect(() => {
    getPlaylistFromServer();
  }, [currentPlayList]);

  useEffect(() => {
    console.log("set user play");
    if (!currentPlayList && userPlayLists.length > 0) {
      setCurrentPlayList(userPlayLists[0].playlistName);
    }
  }, [userPlayLists]);

  // messages functions:

  const changeMessage = (str, isEror = false) => {
    setMessage({ message: str, isEror: isEror });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const waitingMessage = () => {
    changeMessage("Waiting for results from server");
  };

  //  fetch to server functions:

  const getPlaylistsUserFromServer = async () => {
    if (!localStorage.currentUser) {
      setUserPlayLists([]);
      return;
    }
    const ans = await fetch(`${BASE_URL}/playList/userplaylists`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
    });
    const myPlayLists = await ans.json();
    if (ans.status === 200) {
      setUserPlayLists([...myPlayLists]);

      console.log("got play lists from server");
    } else {
      setUserPlayLists([]);
    }
  };

  const getPlaylistFromServer = async () => {
    if (!localStorage.currentUser) {
      console.log("no user");
      setNewPlayList([]);
      return;
    } else if (!currentPlayList) {
      return;
    }
    const ans = await fetch(
      `${BASE_URL}/playList/playlist/${currentPlayList}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
        },
      }
    );
    const myPlayList = await ans.json();
    if (ans.status === 200) {
      setNewPlayList([...myPlayList]);
    } else {
      setNewPlayList([]);
    }
  };

  // general functions in page:

  const updateSongResurce = (songId) => {
    // setAutoplayFlag(true);
    const youtubeId = songId;

    setVideoSrc({
      type: "video",
      sources: [
        {
          src: youtubeId,
          provider: "youtube",
        },
      ],
    });
    localStorage.youtubeId = JSON.stringify(songId);
  };

  return (
    <div className="Body">
      <div className="Body-container">
        <br></br>

        <handleChangeMesage.Provider
          value={{
            changeMessage,
            waitingMessage,
          }}
        >
          <handlePlaylist.Provider
            value={{
              updateSongResurce,
              getPlaylistFromServer,
              getPlaylistsUserFromServer,
              // autoplayFlag,
              // setAutoplayFlag,
            }}
          >
            <div className="Body-inputsAndButtonsContainer">
              {localStorage.currentUser && (
                <PlayListsUser className="Body-CreatePlaylist" />
              )}
              <SearchSongs className="Body-SearchApi" />
            </div>
            <div>
              <p className="Body-message">
                <b>Message: </b>
                <MessageNote
                  message={message?.message}
                  isEror={message?.isEror}
                />
              </p>
            </div>
            <div className="Body-contex">
              {localStorage.currentUser && (
                <PlayList className="Body-PlayList" newPlayList={newPlayList} />
              )}
              <FoundedSongsYouTube
                className="Body-FoundedSongsYouTube"
                searchSongResults={searchSongApiResults}
              />
              {localStorage.currentUser && (
                <FoundedSongsPlaylist
                  className="Body-FoundedSongsPlaylist"
                  searchSongResults={searchPlaylistResults}
                />
              )}
            </div>
          </handlePlaylist.Provider>
        </handleChangeMesage.Provider>
        <div className="Body-footer"></div>
      </div>
    </div>
  );
};

export default Body;
