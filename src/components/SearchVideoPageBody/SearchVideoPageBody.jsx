import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../VideoPlay/VideoPlay";
import SearchVideo from "../SearchVideo/SearchVideo";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "../FoundedVideosYouTube/FoundedVideosYouTube";
import MessageNote from "../generalComponents/MessageNote/MessageNote";
import UserPlayLists from "../UserPlayLists/UserPlayLists";
import handleUser from "../../context/handleUser";

const SearchPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPlayList, setCurrentPlayList] = useState();

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

  return (
    <div>
      <HandleSearchVideoApi.Provider
        value={{
          searchVideoApiResults,
          setSearchVideoApiResults,
          // setVideoSrc,
          currentPlayList,
          setCurrentPlayList,
          changeMessage,
          waitingMessage,
          updateVideoResurce,
        }}
      >
        <SearchVideo />
        <div className="SearchPageBody-VideoPlay">
          <VideoPlay videoSrc={videoSrc} />
        </div>
        <MessageNote message={message.message} isEror={message.isEror} />
        {/* <p className="Body-message">
          <b>Message: </b>
          <MessageNote message={message?.message} isEror={message?.isEror} />
        </p> */}
        {/* <MessageNote /> */}
        {/* <Playlists /> */}
        <UserPlayLists type="add" />
        <FoundedVideosYouTube
          className="Body-FoundedSongsYouTube"
          searchVideoResults={searchVideoApiResults}
        />
      </HandleSearchVideoApi.Provider>
    </div>
  );
};

export default SearchPageBody;
