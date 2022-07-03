import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import SearchVideo from "./SearchVideo/SearchVideo";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";
import UserPlayLists from "../generalComponents/UserPlayLists/UserPlayLists";
// import SearchIcon from "@mui/icons-material/Search";

import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import handleHeader from "../../context/archive/handleHeader";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../general/main_var";
import InputAndButton from "../generalComponents/InputAndButton/InputAndButton";
import handleMessage from "../../context/handleMessage";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState(
    localStorage.searchVideoApiResults.length
      ? JSON.parse(localStorage.searchVideoApiResults)
      : []
  );
  const [currentPlayList, setCurrentPlayList] = useState();
  const { favoritePlaylist, setFavoritePlaylist, setUserPlaylists } =
    useContext(handlePlaylistMainState);
  const { changeMessage, waitingMessage } = useContext(handleMessage);

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
      if (localStorage.searchVideoApiResults.length) {
        updateVideoResurce(searchVideoApiResults[0].id);
      }
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

  const searchVideosFromServer = async (searchValue) => {
    try {
      console.log({ searchValue });
      if (searchValue === "") {
        changeMessage("You didn't enter search value", "error");
        return;
      } else if (searchValue.length > 20) {
        changeMessage(
          `Too long serach of ${searchValue.length} letters. please try less than 20 letters `,
          "warning"
        );
        return;
      }

      waitingMessage();
      const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
      const data = await ans.json();
      if (ans.status === 200) {
        setSearchVideoApiResults(data);

        localStorage.searchVideoApiResults = JSON.stringify(data);
        updateVideoResurce(data[0].id);
        console.log("found", 61);
        changeMessage(
          "Great. we founded videos for you from YouTube",
          "success"
        );
      } else {
        changeMessage(data.message, "warning");
      }
    } catch (e) {
      console.log(e);
    }
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
              {/* <SearchVideo /> */}
              <InputAndButton
                buttonFunc={searchVideosFromServer}
                icon={"search"}
                type="video"
              />
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
          </div>
        </HandleSearchVideoApi.Provider>

        {/* </Box> */}
      </div>
    </div>
  );
};

export default SearchVideoPageBody;
