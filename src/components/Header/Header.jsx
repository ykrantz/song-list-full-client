import "./Header.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import handleUser from "../../context/handleUser";
import MenuDrower from "./MenuDrower/MenuDrower";

import AccountMenu from "./AccountMenu/AccountMenu";

const Header = () => {
  const [displayAcountLogInRegister, setDisplayAcountLogInRegister] =
    useState(true);
  const { currentUser } = useContext(handleUser);
  useEffect(() => {
    isDisplayAcountLogInRegister();
  }, []);

  const location = useLocation();
  const pathLocation = location.pathname;

  const getHeaderPageTitle = () => {
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
    const pageName = pathLocation;
    if (
      pageName === "/" ||
      pageName === "/search" ||
      pageName === "/playlists" ||
      pageName === "/favorites"
    ) {
      setDisplayAcountLogInRegister(true);
    } else {
      setDisplayAcountLogInRegister(false);
    }
  };

  return (
    <div className="Header-container">
      <div className="Header-MenuDrower">
        <MenuDrower />
      </div>
      <h1 className="Header-titlePageName">{getHeaderPageTitle()}</h1>
      <div className="Header-AcountMenuDiv">
        {displayAcountLogInRegister && (
          <div className="Header-logInOutAcountMenu">
            <Stack spacing={0.5} direction="column">
              {!currentUser && (
                <div>
                  {<Link to="/login"> log in</Link>}
                  {" / "}
                  {<Link to="/register">register</Link>}
                </div>
              )}
              {currentUser && (
                <div className="Header-AccountMenuaAvatar">
                  <AccountMenu userName={currentUser} />
                </div>
              )}
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
