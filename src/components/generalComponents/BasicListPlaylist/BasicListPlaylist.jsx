import "./BasicListPlaylist.css";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";

export default function BasicListPlaylist({
  id,
  addVideoToPlaylistServer,
  handleClose,
}) {
  const { userPlaylists, handleSetCurrentPlaylist } = React.useContext(
    handlePlaylistMainState
  );
  return (
    <div className="BasicListPlaylist-Container">
      <b className="BasicListPlaylist-title">Add to Playlist:</b>
      <nav aria-label="main mailbox folders">
        <br></br>
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: "40vh",
            "& ul": { padding: 0 },
          }}
        >
          {userPlaylists.map((playlist) => {
            return (
              <ListItem disablePadding key={playlist?.playlistName}>
                <ListItemButton>
                  <ListItemText
                    primary={playlist.playlistName}
                    onClick={() => {
                      addVideoToPlaylistServer(id, playlist.playlistName);
                      handleSetCurrentPlaylist(playlist.playlistName);
                      handleClose(false);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </div>
  );
}
