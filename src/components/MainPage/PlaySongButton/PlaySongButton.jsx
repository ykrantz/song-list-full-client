import "./PlaySongButton.css";
import React, { useContext } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import handlePlaylist from "../../../context/handlePlaylist";

const PlaySongButton = ({ id }) => {
  const { updateSongResurce, setAutoplayFlag } = useContext(handlePlaylist);
  return (
    <div className="PlaySongButton-div">
      <PlayCircleFilledWhiteIcon
        fontSize="large"
        onClick={() => {
          // setAutoplayFlag(true);
          updateSongResurce(id);
        }}
      />
    </div>
  );
};

export default PlaySongButton;
