import "./PlaylistsPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import { BASE_URL } from "../../general/main_var";
import HandlePlaylists from "../../context/handlePlaylists";
import Playlist from "./Playlist/Playlist";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import handleMessage from "../../context/handleMessage";
import handleHeader from "../../context/archive/handleHeader";
// import Playlist from "../Playlist/Playlist";

const PlaylistsPageBody = () => {
  // const [message, setMessage] = useState("");
  // const [userPlaylists, setUserPlaylists] = useState("");
  const {
    currentPlaylist,
    setCurrentPlaylist,
    favoritePlaylist,
    userPlaylists,
    setUserPlaylists,
  } = useContext(handlePlaylistMainState);
  const { changeMessage, waitingMessage } = useContext(handleMessage);

  const [playlist, setPlaylist] = useState([]);

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // TODO: fix bug when current playlist is My favorites.when remove from favorties need to remove from playlist
  useEffect(() => {}, []);
  useEffect(() => {
    try {
      waitingMessage();
      getPlaylistFromServer();
      changeMessage("", "");
    } catch (e) {
      console.log(e);
    }
  }, [currentPlaylist]);

  const updateVideoResurce = (videoId) => {
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

  const getPlaylistFromServer = async () => {
    try {
      if (!localStorage.currentUser) {
        console.log("no user");
        setPlaylist([]);
        return;
      } else if (!currentPlaylist) {
        return;
      }
      const ans = await fetch(
        `${BASE_URL}/playList/playlist/${currentPlaylist}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
          },
        }
      );
      let myPlaylist = await ans.json();
      if (ans.status === 200) {
        myPlaylist = [...myPlaylist].reverse();
        setPlaylist([...myPlaylist]);
      } else {
        setPlaylist([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="PlaylistsPageBody-container">
      <div className="PlaylistsPageBody-videoPlay">
        <VideoPlay videoSrc={videoSrc}></VideoPlay>
      </div>
      <HandlePlaylists.Provider
        value={{
          // message,
          // setMessage,
          userPlaylists,
          setUserPlaylists,
          // changeMessage,
          // currentPlaylist,
          // setCurrentPlaylist,
          playlist,
          setPlaylist,
          getPlaylistFromServer,

          updateVideoResurce,
        }}
      >
        <CreatePlaylist />
        <div className="PlaylistsPageBody-Playlist">
          {/* <Playlists /> */}

          <Playlist />
        </div>
      </HandlePlaylists.Provider>
    </div>
  );
};

export default PlaylistsPageBody;
