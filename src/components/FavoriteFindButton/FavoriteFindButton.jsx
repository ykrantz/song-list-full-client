import "./FavoriteFindButton.css";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router";

const FavoriteFindButton = ({ songId }) => {
  const navigate = useNavigate();
  return (
    <div>
      <FavoriteIcon
        onClick={() => {
          navigate(`/songfavorites/${songId}`);
        }}
      />
    </div>
  );
};

export default FavoriteFindButton;
