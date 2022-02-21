import React from "react";
import { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import handlePlaylist from "../../context/handlePlaylist";

const RemoveSongButton = ({ _id }) => {
  const { deleteSongFromServer } = useContext(handlePlaylist);

  return (
    <div>
      <DeleteForeverIcon
        fontSize="large"
        onClick={() => deleteSongFromServer(_id)}
      />
    </div>
  );
};

export default RemoveSongButton;
