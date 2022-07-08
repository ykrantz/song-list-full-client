import "./MenuDrower.css";

import MenuIcon from "@mui/icons-material/Menu";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";

export default function MenuDrower() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuOptions = [
    {
      text: "Search",
      link: "/search",
      icon: <ScreenSearchDesktopOutlinedIcon />,
    },
    { text: "Playlists", link: "/playlists", icon: <MusicVideoIcon /> },
    // { text: "Favorites", link: "/favorites", icon: "" },
    { text: "About", link: "/about", icon: <HelpCenterOutlinedIcon /> },
  ];

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ marginTop: "4vh", marginLeft: "2vh" }}>
        {menuOptions.map(({ text, link, icon }, index) => (
          <ListItem key={text} disablePadding onClick={() => navigate(link)}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: "3vh" }}
                primary={text}
                // sx={{ justifyContent: "center" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const anchor = "left";
  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton
          size="large"
          onClick={toggleDrawer(anchor, true)}
          sx={{
            marginLeft: 1,
            //  justifyContent: "left", alignItems: "left"
          }}
        >
          <MenuIcon
            fontSize="large"
            color="primary"
            size="large"
            // sx={{ justifyContent: "left", alignItems: "left" }}
          />
          {/* </Button> */}
        </IconButton>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
