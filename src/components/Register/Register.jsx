import "./Register.css";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import React, { useContext } from "react";
import { useState } from "react";
import handleUser from "../../context/handleUser";
import BackToHome from "../BackToHome/BackToHome";
import checkUserDetailsInput from "../../controllers/checkCorrectInput";
import BASE_URL from "../../general/main_var";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessege] = useState("");
  const { currentUser, setCurrentUser } = useContext(handleUser);

  const registerInServer = async () => {
    const ErorUserDetails = checkUserDetailsInput(userName, password);
    if (ErorUserDetails) {
      setMessege(ErorUserDetails);
      return;
    }

    const ans = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    const data = await ans.json();
    console.log(data);
    if (ans.status === 200) {
      setCurrentUser({ username: userName, password: password });
      localStorage.currentUser = JSON.stringify(userName);
      localStorage.accessToken = JSON.stringify(data.accessToken);

      console.log("registered in server");
      console.log(data.accessToken);
      navigate("/");
    } else {
      setMessege(data.message);
    }
  };

  return (
    <div>
      <BackToHome />

      <h1 className="Register-header">Register:</h1>
      <div className="Register-Inputs">
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

      <div className="Register-buttons">
        <Stack spacing={2} direction="row">
          <Button onClick={() => registerInServer()} variant="contained">
            Register
          </Button>
          <Button onClick={() => navigate("/")} variant="contained">
            Cancel
          </Button>
        </Stack>
      </div>
      <p className="Register-message">{message}</p>
    </div>
  );
};
export default Register;
