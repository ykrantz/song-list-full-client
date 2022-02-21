import "./LogIn.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import React from "react";
import { useState } from "react/cjs/react.development";
import BackToHome from "../BackToHome/BackToHome";
import checkUserDetailsInput from "../../controllers/checkCorrectInput";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessege] = useState("");
  const navigate = useNavigate();

  const logInServer = async () => {
    const ErorUserDetails = checkUserDetailsInput(userName, password);
    if (ErorUserDetails) {
      setMessege(ErorUserDetails);
      return;
    }
    const ans = await fetch("http://localhost:3008/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    const accessTokenRes = await ans.json();

    if (ans.status === 200) {
      localStorage.currentUser = JSON.stringify(userName);
      localStorage.accessToken = JSON.stringify(accessTokenRes.accessToken);
      console.log(accessTokenRes.accessToken);
      navigate("/");
    } else {
      console.log(accessTokenRes);
      setMessege(accessTokenRes.message);
    }
  };

  return (
    <div>
      <BackToHome />

      <h1 className="LogIn-header">Log In:</h1>
      <div className="LogIn-Inputs">
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="outlined-basic"
              placeholder="user name"
              label="user name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              placeholder="password"
              label="password"
              variant="outlined"
            />
          </div>
        </Box>
      </div>

      <div className="LogIn-buttons">
        <Stack spacing={2} direction="row">
          <Button onClick={() => logInServer()} variant="contained">
            Log In
          </Button>
          <Button onClick={() => navigate("/")} variant="contained">
            Cancel
          </Button>
        </Stack>
      </div>

      <p className="Login-message">{message}</p>
    </div>
  );
};
export default LogIn;
