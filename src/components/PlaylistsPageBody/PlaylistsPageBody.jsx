import "./PlaylistsPageBody.css";

import React, { useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import { BASE_URL } from "../../general/main_var";
import HandlePlaylists from "../../context/handlePlaylists";
import Playlist from "./Playlist/Playlist";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";
// import Playlist from "../Playlist/Playlist";

const PlaylistsPageBody = () => {
  const [message, setMessage] = useState("");
  const [userPlaylists, setUserPlaylists] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlist, setPlaylist] = useState([]);

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // const { currentUser, setCurrentUser } = useContext(handleUser);
  // useEffect(()=>{
  //   setCurrentUser()
  // })

  useEffect(() => {
    getPlaylistsUserFromServer();
  }, []);

  useEffect(() => {
    getPlaylistFromServer();
  }, [currentPlaylist]);

  useEffect(() => {
    console.log("set user play");
    if (!currentPlaylist && userPlaylists.length > 0) {
      setCurrentPlaylist(userPlaylists[0].playlistName);
    }
  }, [userPlaylists]);

  const changeMessage = (str, isEror = false) => {
    setMessage({ message: str, isEror: isEror });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const waitingMessage = () => {
    changeMessage("Waiting for results from server");
  };

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

  //  fetch to server functions:

  const getPlaylistsUserFromServer = async () => {
    if (!localStorage.currentUser) {
      setUserPlaylists([]);
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
      setUserPlaylists([...myPlayLists]);

      console.log("got play lists from server");
    } else {
      setUserPlaylists([]);
    }
  };

  const getPlaylistFromServer = async () => {
    console.log(27);
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
    const myPlaylist = await ans.json();
    console.log({ myPlaylist }, 26);
    if (ans.status === 200) {
      console.log({ myPlayList: myPlaylist }, 24);
      setPlaylist([...myPlaylist]);
    } else {
      setPlaylist([]);
    }
  };

  // general functions in page:
  console.log(
    { playlist },
    { userPlaylists },
    { currentPlaylist },
    // { currentUser },
    25
  );

  return (
    <div className="PlaylistsPageBody-container">
      <div className="PlaylistsPageBody-videoPlay">
        <VideoPlay videoSrc={videoSrc}></VideoPlay>
      </div>
      <HandlePlaylists.Provider
        value={{
          message,
          setMessage,
          userPlaylists,
          setUserPlaylists,
          currentPlaylist,
          setCurrentPlaylist,
          playlist,
          setPlaylist,
          getPlaylistFromServer,
          updateVideoResurce,
        }}
      >
        <div className="PlaylistsPageBody-Playlist">
          {/* <Playlists /> */}
          <UserPlayLists />
          <Playlist />
        </div>
      </HandlePlaylists.Provider>
    </div>
  );
};

export default PlaylistsPageBody;
