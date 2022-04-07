import "./FavoriteFindButton.css";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate } from "react-router";

const FavoriteFindButton = ({ songId }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Tooltip title={"see who liked this song"}>
        <FavoriteIcon
          onClick={() => {
            navigate(`/songfavorites/${songId}`);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default FavoriteFindButton;
