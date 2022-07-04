import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";

import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import { BASE_URL } from "../../general/main_var";
import InputAndButton from "../generalComponents/InputAndButton/InputAndButton";
import handleMessage from "../../context/handleMessage";
import handleVideoSrc from "../../context/handleVideoSrc";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState(
    localStorage?.searchVideoApiResults?.length
      ? JSON.parse(localStorage?.searchVideoApiResults)
      : []
  );
  const { favoritePlaylist, setFavoritePlaylist, setUserPlaylists } =
    useContext(handlePlaylistMainState);
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  const { videoSrc, updateVideoSource } = useContext(handleVideoSrc);

  useEffect(async () => {
    try {
      const myFavorits = await getFavoritePlayList("My Favorites");
      setFavoritePlaylist(myFavorits);

      const userPlaylistsFromServer = await getUserPlaylistsFromServer();
      setUserPlaylists(userPlaylistsFromServer.data);
      if (localStorage?.searchVideoApiResults?.length) {
        updateVideoSource(searchVideoApiResults[0].id);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const searchVideosFromServer = async (searchValue) => {
    try {
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
        updateVideoSource(data[0].id);
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
      <div className="SearchPageBody-content">
        <HandleSearchVideoApi.Provider
          value={{
            searchVideoApiResults,
            setSearchVideoApiResults,
          }}
        >
          <div className="SearchPageBody-left">
            <div className="SearchPageBody-SearchVideo">
              <InputAndButton
                buttonFunc={searchVideosFromServer}
                icon={"search"}
                type="video"
              />
            </div>

            <div className="SearchPageBody-VideoPlay">
              <VideoPlay videoSrc={videoSrc} />
            </div>
          </div>

          <div className="SearchPageBody-right">
            <FoundedVideosYouTube searchVideoResults={searchVideoApiResults} />
          </div>
        </HandleSearchVideoApi.Provider>
      </div>
    </div>
  );
};

export default SearchVideoPageBody;
