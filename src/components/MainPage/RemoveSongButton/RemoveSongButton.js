import React from "react";
import { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

import handleMainStates from "../../../context/handleMainStates";
import BASE_URL from "../../../general/main_var";
import handlePlaylist from "../../../context/handlePlaylist";
import handleChangeMesage from "../../../context/handleChangeMesage";

const RemoveSongButton = ({ _id }) => {
  const { currentPlayList } = useContext(handleMainStates);
  const { getPlaylistFromServer } = useContext(handlePlaylist);
  const { changeMessage } = useContext(handleChangeMesage);

  const deleteSongFromServer = async (songId) => {
    const accessToken = JSON.parse(localStorage.accessToken);
    const ans = await fetch(`${BASE_URL}/playlist/deletesong`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({
        playlistName: currentPlayList,
        songId: songId,
      }),
    });
    const data = await ans.json();
    console.log(data);
    if (ans.status === 200) {
      changeMessage("video was deleted from server");
      await getPlaylistFromServer();
    }
  };

  return (
    <div>
      <Tooltip title={"delete song"}>
        <DeleteForeverIcon
          fontSize="large"
          onClick={() => deleteSongFromServer(_id)}
        />
      </Tooltip>
    </div>
  );
};

export default RemoveSongButton;
