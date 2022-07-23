import React, { lazy, Suspense } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "./FoundedVideosYouTube.css";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { useCallback, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import AddVideoToPlaylist from "../AddVideoToPlaylist/AddVideoToPlaylist";
import formolizeVideoToServer from "../../../actions/sideFunctions/formolizeVideoToServer";
import handleMessage from "../../../context/handleMessage";
import { BASE_URL } from "../../../utils/main_var";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import VideoItem from "../../generalComponents/VideoItem/VideoItem";
import handleSearchResults from "../../../context/handleSearchResults";
import { CircularProgress, Typography } from "@mui/material";
import CircularIndeterminate from "../../generalComponents/CircularIndeterminate/CircularIndeterminate";
// import WaitingForServerAnsCircle from "../../generalComponents/WaitingForServerAnsCircle/WaitingForServerAnsCircle";
// import React from "react";
// import FoundedVideoResults from "../FoundedVideoResults/FoundedVideoResults";

const FoundedVideoResults = lazy(() =>
  import("../FoundedVideoResults/FoundedVideoResults")
);
// const Artists = lazy(() => import(‘./Artists’))

const FoundedVideosYouTube = ({ waitingForServerAns }) => {
  const { getFavoritePlaylistFromServer, setCurrentPlaylist } = useContext(
    handlePlaylistMainState
  );
  const { changeMessage } = useContext(handleMessage);
  const { searchVideoApiResults } = useContext(handleSearchVideoApi);
  const { searchVideoResults, setSearchVideoResults } =
    useContext(handleSearchResults);

  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, []);
  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, [searchVideoApiResults]);

  // const getVideoApiDitails = (videoId) => {
  //   return searchVideoApiResults.find((video) => video.id === videoId);
  // };

  // const addVideoToPlaylistServer = useCallback(
  //   async (videoId, playlistName) => {
  //     try {
  //       if (!playlistName) {
  //         changeMessage(
  //           "Please choose/create playlist before adding a video",
  //           "warning"
  //         );
  //         return;
  //       }
  //       const videoDitails = getVideoApiDitails(videoId);
  //       const accessToken = JSON.parse(localStorage?.accessToken);
  //       const ans = await fetch(`${BASE_URL}/playlist`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           playlistName: playlistName,
  //           song: formolizeVideoToServer(videoDitails),
  //         }),
  //       });

  //       const data = await ans.json();
  //       // console.log(data);

  //       if (ans.status === 200) {
  //         console.log("video was updated in server");
  //         setCurrentPlaylist(playlistName);
  //         changeMessage(`Added to playlist:
  //       ${playlistName.substring(0, 25)}`);
  //       } else {
  //         // console.log(data);

  //         changeMessage(data?.message, "warning");
  //       }
  //     } catch (e) {
  //       console.log(e);

  //       changeMessage(e?.message, "error");
  //     }
  //   },
  //   []
  // );

  const AddVideoToPlaylistComponent = useCallback(
    ({ id, addVideoToPlaylistServer }) => {
      return (
        <AddVideoToPlaylist
          id={id}
          addVideoToPlaylistServer={addVideoToPlaylistServer}
        />
      );
    },
    []
  );

  const style = {
    width: "100%",
    maxWidth: 500,
  };
  return (
    <div className="FoundedVideosYouTube-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className="FoundedVideosYouTube-title">
          <span>
            {" "}
            <b>Search Results:</b>
          </span>
        </div>
        <Divider />
        <div className="FoundedVideosYouTube-searchVideoResults">
          {/* {waitingForServerAns ? (
            <WaitingForServerAnsCircle />
          ) : */}
          {/* <Suspense fallback={<h1>Still Loading…</h1>}></Suspense> */}
          <Suspense fallback={<CircularIndeterminate />}>
            <FoundedVideoResults />
          </Suspense>
          {/* searchVideoResults.length === 0 ? (
            <p className="FoundedVideosYouTube-NoResults">
              No video was found in search results
            </p>
          ) : (
            searchVideoResults.map((video) => {
              video.img = video?.thumbnails[0].url;

              return (
                <VideoItem
                  key={video.id}
                  // type= new: when server doesnnt have the details of the song.
                  // need to formolize and all details  to server when adding
                  video={video}
                  type="new"
                  searchVideoApiResults={searchVideoApiResults}
                  iconOne={
                    <AddVideoToPlaylistComponent
                      id={video.id}
                      addVideoToPlaylistServer={addVideoToPlaylistServer}
                    />
                    // <AddVideoToPlaylist
                    //   id={video.id}
                    //   addVideoToPlaylistServer={addVideoToPlaylistServer}
                    // />
                  }
                />
              );
            })
          )} */}
        </div>

        <Divider />
        <p className="FoundedVideosYouTube-linkToPlaylist">
          To see your playlist press <Link to="/playlists">here</Link>
        </p>
      </List>
    </div>
  );
};

export default FoundedVideosYouTube;
