import "./UserFavorite.css";

import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const UserFavorite = ({
  playlist: {
    playlistName,
    user: { username },
  },
}) => {
  return (
    <div>
      <ListItem button>
        <ListItemText primary={`User name: ${username}`} />
        <ListItemText primary={`Playlist name:${playlistName}`} />
      </ListItem>
      <Divider />
    </div>
  );
};

export default UserFavorite;
