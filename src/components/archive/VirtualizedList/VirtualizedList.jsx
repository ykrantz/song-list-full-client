import "./VirtualizedList.css";

import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import handlePlaylistMainState from "../../../context/handlePlaylistMainState";

function renderRow(props) {
  const { index, style, userPlaylists } = props;
  console.log({ index }, 62);

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        {/* <ListItemText primary={`Item ${index + 1}`} /> */}
        <ListItemText primary={` ${userPlaylists[index]}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const {
    currentPlaylist,
    setCurrentPlaylist,
    userPlaylists,
    setUserPlaylists,
  } = React.useContext(handlePlaylistMainState);
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
