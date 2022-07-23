import React, { useCallback, useContext } from "react";
import formolizeVideoToServer from "../../../actions/sideFunctions/formolizeVideoToServer";
import handleMessage from "../../../context/handleMessage";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import handleSearchResults from "../../../context/handleSearchResults";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import { BASE_URL } from "../../../utils/main_var";
import VideoItem from "../../generalComponents/VideoItem/VideoItem";
import AddVideoToPlaylistComponent from "../AddVideoToPlaylist/AddVideoToPlaylist";

const FoundedVideoResults = () => {
  const { searchVideoApiResults } = useContext(handleSearchVideoApi);
  const { changeMessage } = useContext(handleMessage);
  const { getFavoritePlaylistFromServer, setCurrentPlaylist } = useContext(
    handlePlaylistMainState
  );
  const { searchVideoResults, setSearchVideoResults } =
    useContext(handleSearchResults);

  const getVideoApiDitails = (videoId) => {
    return searchVideoApiResults.find((video) => video.id === videoId);
  };

  const addVideoToPlaylistServer = useCallback(
    async (videoId, playlistName) => {
      try {
        if (!playlistName) {
          changeMessage(
            "Please choose/create playlist before adding a video",
            "warning"
          );
          return;
        }
        const videoDitails = getVideoApiDitails(videoId);
        const accessToken = JSON.parse(localStorage?.accessToken);
        const ans = await fetch(`${BASE_URL}/playlist`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify({
            playlistName: playlistName,
            song: formolizeVideoToServer(videoDitails),
          }),
        });

        const data = await ans.json();
        // console.log(data);

        if (ans.status === 200) {
          console.log("video was updated in server");
          setCurrentPlaylist(playlistName);
          changeMessage(`Added to playlist:  
            ${playlistName.substring(0, 25)}`);
        } else {
          // console.log(data);

          changeMessage(data?.message, "warning");
        }
      } catch (e) {
        console.log(e);

        changeMessage(e?.message, "error");
      }
    },
    []
  );

  return (
    <div>
      {searchVideoResults.length === 0 ? (
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
      )}
    </div>
  );
};

export default FoundedVideoResults;
