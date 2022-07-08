import "./SearchVideoPageBody.css";

import React, { useContext, useEffect, useState } from "react";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import HandleSearchVideoApi from "../../context/handleSearchVideoApi";
import FoundedVideosYouTube from "./FoundedVideosYouTube/FoundedVideosYouTube";

import getFavoritePlayList from "../../controllers/getPlaylistVideo";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import { BASE_URL, initSearchApiResults } from "../../general/main_var";
import InputAndButton from "../generalComponents/InputAndButton/InputAndButton";
import handleMessage from "../../context/handleMessage";
import handleVideoSrc from "../../context/handleVideoSrc";
import handleUser from "../../context/handleUser";
import initConnectToServer from "../../controllers/initConnectToServer";

const SearchVideoPageBody = () => {
  const [searchVideoApiResults, setSearchVideoApiResults] = useState(
    localStorage?.searchVideoApiResults?.length
      ? JSON.parse(localStorage?.searchVideoApiResults)
      : initSearchApiResults
  );

  const { favoritePlaylist, setFavoritePlaylist, setUserPlaylists } =
    useContext(handlePlaylistMainState);
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  const { currentUser, checkConnectionStatus } = useContext(handleUser);
  const { videoSrc, updateVideoSource } = useContext(handleVideoSrc);
  console.log({ searchVideoApiResults }, 35);
  useEffect(async () => {
    try {
      if (currentUser) {
        const myFavorits = await getFavoritePlayList("My Favorites");
        setFavoritePlaylist(myFavorits);

        const userPlaylistsFromServer = await getUserPlaylistsFromServer();
        console.log({ userPlaylistsFromServer }, 29);
        setUserPlaylists(userPlaylistsFromServer.data);
      } else {
        await checkConnectionStatus();
      }
      if (searchVideoApiResults.length && !videoSrc) {
        updateVideoSource(searchVideoApiResults[0].id);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const searchVideosFromServer = async (searchValue) => {
    try {
      console.log(26);
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
        // console.log(data);
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
                itemsList={searchVideoApiResults}
                setItemsListState={setSearchVideoApiResults}
              />
            </div>

            <div className="SearchPageBody-VideoPlay">
              <VideoPlay videoSrc={videoSrc} />
            </div>
          </div>

          <div className="SearchPageBody-right">
            <FoundedVideosYouTube />
          </div>
        </HandleSearchVideoApi.Provider>
      </div>
    </div>
  );
};

export default SearchVideoPageBody;
