import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "./FoundedVideosYouTube.css";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import AddVideoToPlaylist from "../AddVideoToPlaylist/AddVideoToPlaylist";
import formolizeVideoToServer from "../../../controllers/formolizeVideoToServer";
import handleMessage from "../../../context/handleMessage";
import { BASE_URL } from "../../../general/main_var";
import handleSearchVideoApi from "../../../context/handleSearchVideoApi";
import VideoItem from "../../generalComponents/VideoItem/VideoItem";
const FoundedVideosYouTube = ({ searchVideoResults }) => {
  const { getFavoritePlaylistFromServer, setCurrentPlaylist } = useContext(
    handlePlaylistMainState
  );
  const { changeMessage } = useContext(handleMessage);
  const { searchVideoApiResults } = useContext(handleSearchVideoApi);

  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, []);
  useEffect(() => {
    getFavoritePlaylistFromServer();
  }, [searchVideoResults]);

  const AddVideoToPlaylistComponent = ({ id, addVideoToPlaylistServer }) => {
    return (
      <AddVideoToPlaylist
        id={id}
        addVideoToPlaylistServer={addVideoToPlaylistServer}
      />
    );
  };
  const getVideoApiDitails = (videoId) => {
    return searchVideoApiResults.find((video) => video.id === videoId);
  };
  const addVideoToPlaylistServer = async (videoId, playlistName) => {
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
    }
  };

  const style = {
    width: "100%",
    maxWidth: 500,
  };

  return (
    <div className="FoundedVideosYouTube-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <p className="FoundedVideosYouTube-title">
          {" "}
          <b>Search Results:</b>
        </p>
        <Divider />
        <div className="FoundedVideosYouTube-searchVideoResults">
          {searchVideoResults.map((video) => {
            video.img = video?.thumbnails[0].url;
            return (
              <VideoItem
                key={video.id}
                video={video}
                type="new"
                searchVideoApiResults={searchVideoApiResults}
                iconOne={
                  <AddVideoToPlaylistComponent
                    id={video.id}
                    addVideoToPlaylistServer={addVideoToPlaylistServer}
                  />
                }
              />
            );
          })}
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
