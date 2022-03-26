import "./UserFavorite.css";

import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import QuizIcon from "@mui/icons-material/Quiz";

const UserFavorite = ({
  playlist: {
    playlistName,
    user: { username },
  },
}) => {
  // console.log(user);
  return (
    <div>
      <ListItem button>
        {/* <PlaySongButton id={id} /> */}
        <ListItemText primary={`User name: ${username}`} />
        <ListItemText primary={`Playlist name:${playlistName}`} />
        {/* <RemoveSongButton id={id} /> */}
        {/* <img src={img} className="PlaylistSong-img"></img> */}
        {/* <FavoriteFindButton songId={id} /> */}
      </ListItem>
      <Divider />
      {/* <p>user name: {user}</p> */}
    </div>
  );
};

export default UserFavorite;
