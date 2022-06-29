import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import SearchVideo from "./SearchVideo/SearchVideo";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";

import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState([]);
  const [currentPlayList, setCurrentPlayList] = useState();
  const { favoritePlaylist, setFavoritePlaylist } = useContext(
    handlePlaylistMainState
  );
  console.log(localStorage.currentUser, localStorage.accessToken, 13);

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // const { changeMessage } = useContext(handleMessage);

  useEffect(async () => {
    const myFavorits = await getFavoritePlayList("My Favorites");
    setFavoritePlaylist(myFavorits);
  }, []);

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
          currentPlayList,
          setCurrentPlayList,

          updateVideoResurce,
        }}
      >
        <SearchVideo />
        <div className="SearchPageBody-VideoPlay">
          <VideoPlay videoSrc={videoSrc} />
        </div>

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
