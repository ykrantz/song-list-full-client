import "./PlaylistsPageBody.css";

import React, { useState } from "react";
import VideoPlay from "../VideoPlay/VideoPlay";
import { BASE_URL } from "../../general/main_var";

const PlaylistsPageBody = () => {
  const [message, setMessage] = useState("");
  const [userPlayLists, setUserPlayLists] = useState("");
  const [currentPlayList, setCurrentPlayList] = useState();
  const [playlistVideos, setPlaylistVideos] = useState();

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // const { currentUser, setCurrentUser } = useContext(handleUser);
  // useEffect(()=>{
  //   setCurrentUser()
  // })

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
      setPlaylistVideos([]);
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
      setPlaylistVideos([...myPlayList]);
    } else {
      setPlaylistVideos([]);
    }
  };

  // general functions in page:

  return (
    <div>
      <VideoPlay videoSrc={videoSrc}></VideoPlay>
    </div>
  );
};

export default PlaylistsPageBody;
