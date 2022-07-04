import "./PlaylistsPageBody.css";

import React, { useContext, useEffect, useState } from "react";
// import CreatePlaylist from "../archive/CreatePlaylist/CreatePlaylist";
import VideoPlay from "../generalComponents/VideoPlay/VideoPlay";
import { BASE_URL } from "../../general/main_var";
import HandlePlaylists from "../../context/handlePlaylists";
import Playlist from "./Playlist/Playlist";
import handlePlaylistMainState from "../../context/handlePlaylistMainState";
import handleMessage from "../../context/handleMessage";
import InputAndButton from "../generalComponents/InputAndButton/InputAndButton";
import handleUser from "../../context/handleUser";
import getUserPlaylistsFromServer from "../../controllers/getUserPlaylistsFromServer";
import handleVideoSrc from "../../context/handleVideoSrc";

const PlaylistsPageBody = () => {
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
  } = useContext(handlePlaylistMainState);
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  const { currentUser } = useContext(handleUser);

  const [playlist, setPlaylist] = useState([]);
  const { videoSrc, updateVideoSource } = useContext(handleVideoSrc);

  useEffect(async () => {
    try {
      await getPlaylistFromServer();

      if (playlist.length > 0) {
        updateVideoSource(playlist[0].id);
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentPlaylist]);

  useEffect(async () => {
    if (playlist.length > 0 && videoSrc?.sources[0]?.src !== playlist[0].id) {
      updateVideoSource(playlist[0].id);
    }
  }, [playlist]);

  const getPlaylistFromServer = async () => {
    try {
      if (!currentUser) {
        changeMessage("Please log in / register to see your playlist");
        console.log("no user");
        setPlaylist([]);
        return;
      } else if (!currentPlaylist) {
        changeMessage("Please log in / register to see your playlist");

        return;
      }
      waitingMessage();
      const ans = await fetch(
        `${BASE_URL}/playList/playlist/${currentPlaylist}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage?.accessToken)}`,
          },
        }
      );
      let myPlaylist = await ans.json();
      if (ans.status === 200) {
        myPlaylist = [...myPlaylist].reverse();
        setPlaylist([...myPlaylist]);
        changeMessage("Got your updated playlist from server", "success");
      } else {
        setPlaylist([]);
        changeMessage(ans?.message, "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createPlayListInServer = async (playlistName) => {
    try {
      if (!currentUser) {
        changeMessage(`Please log in to create playlist`, "error");
        return;
      }

      if (playlistName) {
        if (playlistName.length < 20) {
          const accessToken = JSON.parse(localStorage?.accessToken);
          const ans = await fetch(`${BASE_URL}/playlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${accessToken}`,
            },
            body: JSON.stringify({
              playlistName: playlistName,
            }),
          });
          const data = await ans.json();
          // console.log(data);
          if (ans.status === 200) {
            console.log("plalist was updated in server");

            const userPlaylistsFromServer = await getUserPlaylistsFromServer();
            setUserPlaylists(userPlaylistsFromServer.data);

            setCurrentPlaylist(playlistName);
            changeMessage(`new playlist was created: ${playlistName}`);
          } else {
            changeMessage(data.message, "warning");
          }
        } else {
          changeMessage(
            `Playlist can be up to 15 letters. You entered : ${playlistName.length} letters `,
            "warning"
          );
        }
      } else {
        changeMessage("You didn't enter a playlist name", "warning");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="PlaylistsPageBody-container">
      <div className="PlaylistsPageBody-content">
        <div className="PlaylistsPageBody-left">
          <div className="PlaylistsPageBody-videoPlay">
            <InputAndButton
              buttonFunc={createPlayListInServer}
              icon={"create"}
              type="playlist"
            />
            <VideoPlay videoSrc={videoSrc}></VideoPlay>
          </div>
        </div>
        <HandlePlaylists.Provider
          value={{
            userPlaylists,
            setUserPlaylists,

            playlist,
            setPlaylist,
            getPlaylistFromServer,
          }}
        >
          <div className="PlaylistsPageBody-right">
            <div className="PlaylistsPageBody-Playlist">
              <Playlist />
            </div>
          </div>
        </HandlePlaylists.Provider>
      </div>
    </div>
  );
};

export default PlaylistsPageBody;
