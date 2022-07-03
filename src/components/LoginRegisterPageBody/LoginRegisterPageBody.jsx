import "./LoginRegisterPageBody.css";
import handleMessage from "../../context/handleMessage";
import { BASE_URL } from "../../general/main_var";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import checkUserDetailsInput from "../../controllers/checkCorrectInput";
import { Divider } from "@mui/material";
import handleUser from "../../context/handleUser";

const LoginRegisterPageBody = ({ type }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { changeMessage, waitingMessage } = useContext(handleMessage);
  const { handleSetCurrentUser } = useContext(handleUser);

  const navigate = useNavigate();

  const logInRegisterServer = async (apiPath) => {
    waitingMessage();
    const ErorUserDetails = checkUserDetailsInput(userName, password);
    if (ErorUserDetails) {
      changeMessage(ErorUserDetails, "error");
      return;
    }
    const ans = await fetch(`${BASE_URL}/users/${apiPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    const accessTokenRes = await ans.json();

    if (ans.status === 200) {
      localStorage.accessToken = JSON.stringify(accessTokenRes.accessToken);
      handleSetCurrentUser(userName);
      navigate("/");
    } else {
      console.log(accessTokenRes);
      changeMessage(accessTokenRes.message, "error");
    }
  };

  return (
    <div>
      <div className="LoginRegisterPageBody-container">
        {type === "register" && (
          <p className="LoginRegisterPageBody-registerTitle">
            Please select a User Name and Password
          </p>
        )}
        <div className="LoginRegisterPageBody-Inputs">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    logInRegisterServer(type);
                  }
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="outlined-basic-user-name"
                placeholder="user name"
                label="user name"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    logInRegisterServer(type);
                  }
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic-password"
                placeholder="password"
                label="password"
                variant="outlined"
              />
            </div>
          </Box>
        </div>

        <div className="LoginRegisterPageBody-buttons">
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => logInRegisterServer(type)}
              variant="contained"
            >
              {type === "logIn" ? "Log in" : type}
            </Button>
            <Button onClick={() => navigate("/")} variant="contained">
              Cancel
            </Button>
          </Stack>
        </div>
      </div>
      <Divider />
      <div className="LoginRegisterPageBody-changePage">
        <p>
          {type === "logIn" ? "New User?  " : "Already Registered?  "}
          <Link to={`/${type === "logIn" ? "register" : "login"}`}>
            {type === "logIn" ? "Register" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterPageBody;
