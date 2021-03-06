import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";

import getPlaylistVideo from "../../actions/getData/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import getUserPlaylistsFromServer from "../../actions/getData/getUserPlaylistsFromServer";
import { BASE_URL, initSearchApiResults } from "../../utils/main_var";
import InputAndButton from "../generalComponents/InputAndButton/InputAndButton";
import handleMessage from "../../context/handleMessage";
import handleVideoSrc from "../../context/handleVideoSrc";
import handleUser from "../../context/handleUser";
import handleSearchResults from "../../context/handleSearchResults";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState(
    localStorage?.searchVideoApiResults?.length
      ? JSON.parse(localStorage?.searchVideoApiResults)
      : initSearchApiResults
  );

  const { setFavoritePlaylist, setUserPlaylists } = useContext(
    handlePlaylistMainState
  );
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  const { currentUser, checkConnectionStatus } = useContext(handleUser);
  const { videoSrc, updateVideoSource } = useContext(handleVideoSrc);
  const { setSearchVideoResults } = useContext(handleSearchResults);
  const [waitingForServerAns, setWaitingForServerAns] = useState(false);

  useEffect(async () => {
    try {
      if (currentUser) {
        const myFavorits = await getPlaylistVideo("My Favorites");
        setFavoritePlaylist(myFavorits);

        const userPlaylistsFromServer = await getUserPlaylistsFromServer();
        setUserPlaylists(userPlaylistsFromServer.data);
      } else {
        await checkConnectionStatus();
      }
      if (searchVideoApiResults.length && !videoSrc) {
        updateVideoSource(searchVideoApiResults[0].id);
      }
    } catch (e) {
      console.log(e);
      changeMessage(e?.message, "error");
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
      setWaitingForServerAns(true);
      // waitingMessage();
      const ans = await fetch(`${BASE_URL}/api/search/${searchValue}`);
      const data = await ans.json();
      if (ans.status === 200) {
        setSearchVideoApiResults(data);
        setSearchVideoResults(data);
        // console.log(data);
        localStorage.searchVideoApiResults = JSON.stringify(data);
        updateVideoSource(data[0].id);
        setWaitingForServerAns(false);
        changeMessage(
          "Great. we founded videos for you from YouTube",
          "success"
        );
      } else {
        changeMessage(data.message, "warning");
      }
    } catch (e) {
      console.log(e);
      changeMessage(e?.message, "error");
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
                itemsList={searchVideoApiResults}
                // setItemsListState={setSearchVideoApiResults}
              />
            </div>

            <div className="SearchPageBody-VideoPlay">
              <VideoPlay videoSrc={videoSrc} />
            </div>
          </div>

          <div className="SearchPageBody-right">
            <FoundedVideosYouTube waitingForServerAns={waitingForServerAns} />
          </div>
        </HandleSearchVideoApi.Provider>
      </div>
    </div>
  );
};

export default SearchVideoPageBody;
