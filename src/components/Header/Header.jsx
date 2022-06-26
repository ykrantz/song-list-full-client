import "./Header.css";

import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import ButtonSized from "../../components/generalComponents/ButtonSized/ButtonSized";
import { useContext } from "react";
import handleUser from "../../context/handleUser";
// import HamburgerMenu from "../HamburgerIcon/HamburgerMenu";
import MenuDrower from "./MenuDrower/MenuDrower";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(handleUser);
  console.log(currentUser);
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/register");
  };
  const navigateLogin = () => {
    navigate("/login");
  };
  const logOut = () => {
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
    <div className="Header-container">
      {/* <HamburgerMenu /> */}
      <MenuDrower />
      <h1 className="Header-titlePlaylist">Video play list</h1>
      <div className="Header-buttons">
        <Stack spacing={0.5} direction="column">
          {!localStorage.currentUser && (
            <>
              {/* <Button
                size={"small"}
                onClick={() => navigate("/register")}
                variant="contained"
              >
                register
              </Button> */}
              {/* TODO: check if it works with naviagte */}
              <ButtonSized onClickFunc={navigateRegister} title="register" />

              <ButtonSized onClickFunc={navigateLogin} title="Log in" />
              {/* 
              <Button
                size={"small"}
                onClick={() => navigate("/login")}
                variant="contained"
              >
                Log in
              </Button> */}
            </>
          )}
          {localStorage.currentUser && (
            <div className="Header-logOutDiv">
              <span className="Header-currentUser">
                Welcome, {JSON.parse(localStorage.currentUser)}
              </span>
              <ButtonSized onClickFunc={logOut} title="Log out" />
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Header;
