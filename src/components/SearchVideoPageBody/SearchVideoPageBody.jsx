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
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

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
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <div className="SearchPageBody-content">
        <HandleSearchVideoApi.Provider
          value={{
            searchVideoApiResults,
            setSearchVideoApiResults,
            currentPlayList,
            setCurrentPlayList,

            updateVideoResurce,
          }}
        >
          {/* <Grid container spacing={2}> */}
          <div className="SearchPageBody-left">
            {/* <Grid container spacing={2} item xs={12} md={6}> */}
            {/* <Grid item xs={12} md={8}> */}
            <div className="SearchPageBody-SearchVideo">
              <SearchVideo />
            </div>
            {/* </Grid> */}
            {/* <div className="SearchPageBody-VideoPlay"> */}
            {/* <Grid item xs={10} md={5}> */}
            <div className="SearchPageBody-VideoPlay">
              <VideoPlay videoSrc={videoSrc} />
              {/* </Grid> */}
              {/* </Grid> */}
            </div>
          </div>

          {/* </div> */}
          {/* <UserPlayLists type="add" /> */}
          {/* <div className="SearchPageBody-FoundedVideosYouTube"> */}
          {/* <Grid item xs={12} md={6}> */}
          <div className="SearchPageBody-right">
            <FoundedVideosYouTube searchVideoResults={searchVideoApiResults} />
            {/* </Grid> */}
            {/* </Grid> */}
            {/* </div> */}
            <p className="SearchPageBody-clickPlaylist">
              {" "}
              To see your playlist press <Link to="/playlists">here</Link>
            </p>
          </div>
        </HandleSearchVideoApi.Provider>

        {/* </Box> */}
      </div>
    </div>
  );
};

export default SearchVideoPageBody;
