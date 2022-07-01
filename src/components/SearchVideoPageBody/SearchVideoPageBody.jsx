import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import SearchVideo from "./SearchVideo/SearchVideo";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";

import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import handleHeader from "../../context/archive/handleHeader";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState([]);
  const [currentPlayList, setCurrentPlayList] = useState();
  const { favoritePlaylist, setFavoritePlaylist, setUserPlaylists } =
    useContext(handlePlaylistMainState);

  const [videoSrc, setVideoSrc] = useState(
    localStorage.youtubeId ? JSON.parse(localStorage.youtubeId) : ""
  );
  // const { changeMessage } = useContext(handleMessage);

  useEffect(async () => {
    try {
      const myFavorits = await getFavoritePlayList("My Favorites");
      setFavoritePlaylist(myFavorits);

      const userPlaylistsFromServer = await getUserPlaylistsFromServer();
      setUserPlaylists(userPlaylistsFromServer.data);
    } catch (e) {
      console.log(e);
    }
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
    <div className="SearchPageBody-container">
      <HandleSearchVideoApi.Provider
        value={{
          searchVideoApiResults,
          setSearchVideoApiResults,
          currentPlayList,
          setCurrentPlayList,

          updateVideoResurce,
        }}
      >
        <div className="SearchPageBody-SearchAndVideoPlay">
          <SearchVideo />
          <div className="SearchPageBody-VideoPlay">
            <VideoPlay videoSrc={videoSrc} />
          </div>
        </div>
        {/* <UserPlayLists type="add" /> */}
        <div className="SearchPageBody-FoundedVideosYouTube">
          <FoundedVideosYouTube
            className="Body-FoundedSongsYouTube"
            searchVideoResults={searchVideoApiResults}
          />
        </div>
      </HandleSearchVideoApi.Provider>
    </div>
  );
};

export default SearchVideoPageBody;
