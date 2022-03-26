import PlaylistSong from "../PlaylistSong/PlaylistSong";
import "./PlayList.css";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useContext } from "react";
import handlePlaylist from "../../../context/handlePlaylist";
import Playlists from "../Playlists/Playlists";
import BASE_URL from "../../../general/main_var";

const PlayList = ({ newPlayList, removeSong }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
    bgcolor: "cornsilk",
  };

  const {
    getPlaylistsUserFromServer,
    changeMessage,
    currentPlayList,
    setNewPlayList,
    setCurrentPlayList,
  } = useContext(handlePlaylist);

  const deleteUserPlaylist = async (playlistName) => {
    const accessToken = JSON.parse(localStorage.accessToken);
    const user = JSON.parse(localStorage.currentUser);
    const ans = await fetch(
      `${BASE_URL}/playlist/deleteplaylist/${playlistName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`,
        },
      }
    );
    const data = await ans.json();
    console.log(data);
    if (ans.status === 200) {
      setCurrentPlayList("");
      await getPlaylistsUserFromServer();

      console.log("the play list was deleted from server. playlist was update");
      changeMessage("play list  wad deleted");
    }
  };

  return (
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className="PlayList-container-header">
          <h3 className="PlayList-h1">Play list: </h3>
          <Playlists />
          {currentPlayList && (
            <DeleteSweepIcon
              className="PlayList-DeleteSweepIcon"
              fontSize="large"
              onClick={() => deleteUserPlaylist(currentPlayList)}
            />
          )}
        </div>
        <Divider />
        <div className="PlayList-songs">
          {newPlayList.map((song) => {
            return (
              <div className="PlayList-list">
                <PlaylistSong
                  key={song._id}
                  song={song}
                  removeSong={removeSong}
                />
              </div>
            );
          })}
        </div>
      </List>
    </div>
  );
};

export default PlayList;
