import "./PlaylistsPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import { BASE_URL } from "../../general/main_var";
import HandlePlaylists from "../../context/handlePlaylists";
import Playlist from "./Playlist/Playlist";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import handleMessage from "../../context/handleMessage";
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
  const { changeMessage } = useContext(handleMessage);
  const [playlist, setPlaylist] = useState([]);

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // TODO: fix bug when current playlist is My favorites.when remove from favorties need to remove from playlist
  // const { currentUser, setCurrentUser } = useContext(handleUser);
  // useEffect(()=>{
  //   setCurrentUser()
  // })

  // useEffect(() => {
  //   try {
  //     getPlaylistsUserFromServer();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  useEffect(() => {
    try {
      getPlaylistFromServer();
    } catch (e) {
      console.log(e);
    }
  }, [currentPlaylist]);

  // useEffect(() => {
  //   try {
  //     if (currentPlaylist === "My Favorites") {
  //       getPlaylistFromServer();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [favoritePlaylist]);
  // useEffect(() => {
  //   console.log("set user play");
  //   if (!currentPlaylist && userPlaylists.length > 0) {
  //     setCurrentPlaylist(userPlaylists[0].playlistName);
  //   }
  // }, [userPlaylists]);

  // const changeMessage = (str, isEror = false) => {
  //   setMessage({ message: str, isEror: isEror });

  //   setTimeout(() => {
  //     setMessage("");
  //   }, 3000);
  // };

  const waitingMessage = () => {
    changeMessage("Waiting for results from server", "info");
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

  // const getPlaylistsUserFromServer = async () => {
  //   try {
  //     if (!localStorage.currentUser) {
  //       setUserPlaylists([]);
  //       return;
  //     }
  //     const ans = await fetch(`${BASE_URL}/playList/userplaylists`, {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
  //       },
  //     });
  //     const myPlayLists = await ans.json();
  //     if (ans.status === 200) {
  //       setUserPlaylists([...myPlayLists]);
  //       if (!currentPlaylist && userPlaylists.length > 0) {
  //         setCurrentPlaylist(userPlaylists[0].playlistName);
  //       } else {
  //         console.log("no Playlist of user");
  //       }
  //       console.log("got play lists from server");
  //     } else {
  //       setUserPlaylists([]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getPlaylistFromServer = async () => {
    try {
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
    } catch (e) {
      console.log(e);
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
