import "./AccountMenu.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { height } from "@mui/system";
import handleUser from "../../../context/handleUser";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(() => ({
//   wrapIcon: {
//     alignItems: "center",
//     display: "flex",
//   },
// }));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "5vh",
      height: "5vh",
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ").length > 1 ? name.split(" ")[1][0] : name[name.length - 1]
    }`,
  };
}

export default function AccountMenu({ userName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setCurrentUser } = React.useContext(handleUser);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    // alert("SS");
    localStorage.currentUser = "";
    localStorage.accessToken = "";
    setCurrentUser("");
    // TODO: to empty after logotu. at least the playlist anf currentuser and token
    // setNewPlayList([]);
    // setUserPlayLists([]);
    // setCurrentPlayList([]);
    // setSearchSongApiResults([]);
    // setSearchPlaylistResults([]);
    navigate("/");
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              {...stringAvatar(userName)}
              // sx={{ width: 32, height: 32 }}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          {/* <Avatar />Profile */}
          <div className="AccountMenu-userAvatarInMenu">
            {/* <Typography variant="subtitle1" className={classes.wrapIcon}> */}
            <Typography>
              <Avatar
                {...stringAvatar(userName)}
                // sx={{ width: 32, height: 32 }}
              ></Avatar>
              {/* </Typography> */}
            </Typography>
          </div>
        </MenuItem>
        <MenuItem>
          <Avatar /> {userName}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        {/* <div onAuxClick={handleLogOut()}> */}
        {/* <Button onClick={handleLogOut()}>
          dssf */}
        <MenuItem>
          {/* <MenuItem onClick={handleLogOut()}> */}
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {/* </Button> */}
        {/* </div> */}
      </Menu>
    </React.Fragment>
  );
}
