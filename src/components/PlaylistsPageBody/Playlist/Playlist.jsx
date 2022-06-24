import PlaylistSong from "../../MainPage/Body/PlaylistSong/PlaylistSong";
import "./Playlist.css";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Tooltip from "@mui/material/Tooltip";

import { useContext } from "react";
// import handlePlaylist from "../../context/handlePlaylist";
// import Playlists from "../MainPage/Body/Playlists/Playlists";
import { BASE_URL } from "../../../general/main_var";
// import handleMainStates from "../../context/handleMainStates";
// import handleChangeMesage from "../../context/handleChangeMesage";
import handlePlaylists from "../../../context/handlePlaylists";
import PlaylistVideo from "../PlaylistVideo/PlaylistVideo";

const Playlist = ({ removeSong }) => {
  const style = {
    width: "100%",
    maxWidth: 500,
    bgcolor: "cornsilk",
  };

  // const { getPlaylistsUserFromServer } = useContext(handlePlaylist);
  // const { changeMessage } = useContext(handleChangeMesage);

  const {
    playlist,
    currentPlaylist,
    setCurrentPlaylist,
    getPlaylistsUserFromServer,
    changeMessage,
  } = useContext(handlePlaylists);

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
      setCurrentPlaylist("");
      await getPlaylistsUserFromServer();

      console.log("the play list was deleted from server. playlist was update");
      changeMessage("play list  wad deleted");
    }
  };
  console.log({ playlist }, 23);
  return (
    <div className="PlayList-container">
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className="PlayList-container-header">
          <h3 className="PlayList-h1">Play list: </h3>
          {/* <Playlists /> */}
          {currentPlaylist && (
            <Tooltip title={"delete playlist"}>
              <DeleteSweepIcon
                className="PlayList-DeleteSweepIcon"
                fontSize="large"
                onClick={() => deleteUserPlaylist(currentPlaylist)}
              />
            </Tooltip>
          )}
        </div>
        <Divider />
        <div className="PlayList-songs">
          {playlist.map((song) => {
            return (
              <div className="PlayList-list">
                <PlaylistVideo
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

export default Playlist;
