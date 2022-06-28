import React from "react";
import "./RemoveVideoButton.css";
import { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

// import handleMainStates from "../../../../context/handleMainStates";
import { BASE_URL } from "../../../general/main_var";
// import handlePlaylist from "../../../../context/handlePlaylist";
// import handleChangeMesage from "../../../../context/handleChangeMesage";
import handlePlaylists from "../../../context/handlePlaylists";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";
import handleMessage from "../../../context/handleMessage";

const RemoveVideoButton = ({ id }) => {
  const { changeMessage } = useContext(handleMessage);

  const { getPlaylistFromServer } = useContext(handlePlaylists);
  const { currentPlaylist } = useContext(handlePlaylistMainState);

  const deleteSongFromServer = async (songId) => {
    const accessToken = JSON.parse(localStorage.accessToken);
    const ans = await fetch(`${BASE_URL}/playlist/deletesong`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({
        playlistName: currentPlaylist,
        id: songId,
      }),
    });
    const data = await ans.json();
    // console.log(data);
    if (ans.status === 200) {
      changeMessage("video was deleted from server", "info");
      await getPlaylistFromServer();
    }
  };

  return (
    <div>
      <Tooltip title={"delete song"}>
        <DeleteForeverIcon
          fontSize="large"
          onClick={() => deleteSongFromServer(id, currentPlaylist)}
        />
      </Tooltip>
    </div>
  );
};

export default RemoveVideoButton;
