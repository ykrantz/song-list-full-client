import "./BasicListPlaylist.css";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";

export default function BasicListPlaylist({ id, addVideoToPlaylistServer }) {
  const { userPlaylists, handleSetCurrentPlaylist } = React.useContext(
    handlePlaylistMainState
  );

  return (
    <div className="BasicListPlaylist-Container">
      <b>Add to Playlist:</b>
      {/* <Box sx={{ width: "100%", maxWidth: "360", bgcolor: "background.paper" }}> */}
      <nav aria-label="main mailbox folders">
        <p></p>
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
          {/* {userPlaylists.length > 0 */}
          {/* {userPlaylists.length > 0 && */}
          {userPlaylists.map((playlist) => {
            return (
              <ListItem disablePadding key={playlist.id}>
                <ListItemButton>
                  {/* <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon> */}
                  <ListItemText
                    primary={playlist.playlistName}
                    onClick={() => {
                      addVideoToPlaylistServer(id, playlist.playlistName);
                      handleSetCurrentPlaylist(playlist.playlistName);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* : changeMessage("plese sign in", "error")} */}
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
      {/* </Box> */}
    </div>
  );
}
