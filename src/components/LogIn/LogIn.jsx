import "./LogIn.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import BackToHome from "../generalComponents/BackToHome/BackToHome";
import checkUserDetailsInput from "../../controllers/checkCorrectInput";
import { BASE_URL } from "../../general/main_var";
import MessageNote from "../generalComponents/MessageNote/MessageNote";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const logInServer = async () => {
    setMessage({ message: "Waiting for data from server", isEror: false });

    const ErorUserDetails = checkUserDetailsInput(userName, password);
    if (ErorUserDetails) {
      setMessage(ErorUserDetails);
      return;
    }
    const ans = await fetch(`${BASE_URL}/users/login`, {
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
      setMessage({ message: accessTokenRes.message, isEror: true });
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

      {/* <p className="Login-message">{message}</p> */}
      <MessageNote message={message?.message} isEror={message?.isEror} />
    </div>
  );
};
export default LogIn;
