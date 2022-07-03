import "./Header.css";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import handleUser from "../../context/handleUser";
// import HamburgerMenu from "../HamburgerIcon/HamburgerMenu";
import MenuDrower from "./MenuDrower/MenuDrower";

import AccountMenu from "./AccountMenu/AccountMenu";

const Header = () => {
  // const { currentUser, setCurrentUser } = useContext(handleUser);
  const [displayAcountLogInRegister, setDisplayAcountLogInRegister] =
    useState(true);
  const { currentUser } = useContext(handleUser);
  const navigate = useNavigate();
  // console.log({displayAcountLogInRegister});
  useEffect(() => {
    console.log("FFF");
    isDisplayAcountLogInRegister();
  }, []);

  const location = useLocation();
  const pathLocation = location.pathname;

  // const HeaderView = () => {
  //   const location = useLocation();
  //   console.log(location.pathname);
  //   return location.pathname;
  // };

  const getHeaderPageTitle = () => {
    // const path = HeaderView();
    const path = pathLocation;
    const pathDictonary = {
      "/search": "Search Video",
      "/playlists": "My Playlists",
      "/favorites": "Favorites",
      "/register": "register",
      "/login": "login",
      "/about": "About Me",
      "/": "Search Video",
    };
    return pathDictonary[path];
  };

  const isDisplayAcountLogInRegister = () => {
    // const pageName = HeaderView();
    const pageName = pathLocation;
    console.log({ pageName });
    if (
      pageName === "/" ||
      pageName === "/search" ||
      pageName === "/playlists" ||
      pageName === "/favorites"
    ) {
      setDisplayAcountLogInRegister(true);
      // return true;
    } else {
      setDisplayAcountLogInRegister(false);
      // return false;
    }
  };

  // const navigateRegister = () => {
  //   navigate("/register");
  // };
  // const navigateLogin = () => {
  //   navigate("/login");
  // };
  // const logOut = () => {
  //   localStorage.currentUser = "";
  //   localStorage.accessToken = "";
  //   setCurrentUser("");
  //   // setNewPlayList([]);
  //   // setUserPlayLists([]);
  //   // setCurrentPlayList([]);
  //   // setSearchSongApiResults([]);
  //   // setSearchPlaylistResults([]);
  //   navigate("/");
  // };

  return (
    <div className="Header-container">
      {/* <HamburgerMenu /> */}
      <MenuDrower />
      {/* <MenuDrower2 /> */}
      {/* <div className="test2">
        <PermanentDrawerLeftMenu />
      </div> */}
      {/* <div className="Header-titles"> */}
      {/* <h1 className="Header-titlePlaylist">Video play list</h1> */}
      {/* <h1 className="Header-titlePageName">{currentPage}</h1> */}
      <h1 className="Header-titlePageName">{getHeaderPageTitle()}</h1>
      {/* </div> */}
      {displayAcountLogInRegister && (
        <div className="Header-logInOutAcountMenu">
          <Stack spacing={0.5} direction="column">
            {/* {!localStorage.currentUser && ( */}
            {!currentUser && (
              <div>
                {/* <Button
                size={"small"}
                onClick={() => navigate("/register")}
                variant="contained"
              >
                register
              </Button> */}
                {/* TODO: check if it works with naviagte */}
                {/* <ButtonSized onClickFunc={navigateRegister} title="register" /> */}
                {<Link to="/login"> log in</Link>}
                {" / "}
                {<Link to="/register">register</Link>}
                {/* <ButtonSized onClickFunc={navigateLogin} title="Log in" /> */}
                {/* 
              <Button
                size={"small"}
                onClick={() => navigate("/login")}
                variant="contained"
              >
                Log in
              </Button> */}
              </div>
            )}
            {/* {localStorage.currentUser && ( */}
            {currentUser && (
              <div className="Header-logInOutDiv">
                {/* <span className="Header-currentUser">
                Welcome, {JSON.parse(localStorage.currentUser)}
              </span> */}
                {/* <UserAvatar userName={JSON.parse(localStorage.currentUser)} /> */}
                <AccountMenu userName={JSON.parse(localStorage.currentUser)} />
                {/* <AvatarMenu /> */}
                {/* <ButtonSized onClickFunc={logOut} title="Log out" /> */}
                {/* <div className="Header-logout">
                <Link to="/" onClick={() => logOut()}>
                  log out
                </Link>
              </div> */}
              </div>
            )}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Header;
