import React from "react";
import { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

import handlePlaylist from "../../../context/handlePlaylist";

const RemoveSongButton = ({ _id }) => {
  const { deleteSongFromServer } = useContext(handlePlaylist);

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
