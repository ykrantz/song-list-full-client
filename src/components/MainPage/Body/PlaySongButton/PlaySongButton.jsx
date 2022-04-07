import "./PlaySongButton.css";
import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Tooltip from "@mui/material/Tooltip";

import handlePlaylist from "../../../../context/handlePlaylist";

const PlaySongButton = ({ id }) => {
  const { updateSongResurce, setAutoplayFlag } = useContext(handlePlaylist);
  return (
    <div className="PlaySongButton-div">
      <Tooltip title={"play song"}>
        <PlayCircleFilledWhiteIcon
          fontSize="large"
          onClick={() => {
            // setAutoplayFlag(true);
            updateSongResurce(id);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PlaySongButton;
