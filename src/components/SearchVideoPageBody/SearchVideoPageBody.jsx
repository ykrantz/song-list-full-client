import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import SearchVideo from "./SearchVideo/SearchVideo";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";
import MessageNote from "../generalComponents/MessageNote/MessageNote";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";
import handleUser from "../../context/handleUser";
import handleMessage from "../../context/handleMessage";
import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState([]);
  const [currentPlayList, setCurrentPlayList] = useState();
  const { favoritePlaylist, setFavoritePlaylist } = useContext(
    handlePlaylistMainState
  );

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  const { changeMessage } = useContext(handleMessage);

  useEffect(async () => {
    const myFavorits = await getFavoritePlayList("My Favorites");
    setFavoritePlaylist(myFavorits);
  }, []);
  // const { currentUser, setCurrentUser } = useContext(handleUser);
  // useEffect(()=>{
  //   setCurrentUser()
  // })

  // const waitingMessage = () => {
  //   changeMessage("Waiting for results from server", "info");
  // };

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
  // console.log(message, 30);
  return (
    <div>
      <HandleSearchVideoApi.Provider
        value={{
          searchVideoApiResults,
          setSearchVideoApiResults,
          // setVideoSrc,
          currentPlayList,
          setCurrentPlayList,
          // changeMessage,
          // waitingMessage,
          updateVideoResurce,
        }}
      >
        <SearchVideo />
        <div className="SearchPageBody-VideoPlay">
          <VideoPlay videoSrc={videoSrc} />
        </div>
        {/* <MessageNote message={message.message} isEror={message.isEror} /> */}
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

export default SearchVideoPageBody;
