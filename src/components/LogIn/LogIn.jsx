import "./LogIn.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import { useNavigate } from "react-router-dom";

import React, { useRef } from "react";
import { useContext, useState } from "react/cjs/react.development";
import handleUser from "../../context/handleUser";
import BackToHome from "../BackToHome/BackToHome";

const LogIn = () => {
  // const userName=useRef()
  // const password=useRef()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(handleUser);
  const [message, setMessege] = useState("");
  const navigate = useNavigate();
  // setMessege("")
  const logInServer = async () => {
    if (userName === "" || password === "") {
      alert(`You didnt enter user name/password`);
      return;
    }
    //  console.log("user",{username:userName,password:password});
    const ans = await fetch("http://localhost:3008/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    const accessTokenRes = await ans.json();
    // console.log("accessTokenRes" ,accessTokenRes);
    // setCurrentUser({username:userName,password:password})
    // console.log("user:",currentUser);
    if (ans.status === 200) {
      localStorage.currentUser = JSON.stringify(userName);
      localStorage.accessToken = JSON.stringify(accessTokenRes.accessToken);
      console.log(accessTokenRes.accessToken);
      navigate("/");
    } else {
      setMessege("Invalide cerdentiols");
    }
  };

  // const resetInput=()=>{
  //   setUserName("")
  //   setPassword("")

  // }

  return (
    <div>
      {/* <input type="text" placeholder="password" ref={password}></input>  */}
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
            {/* <TextField value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" placeholder="password" label="password" variant="outlined" /> */}
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
      {/* <input type="text" placeholder="user name" value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
<input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input> */}
      <div className="LogIn-buttons">
        <Stack spacing={2} direction="row">
          <Button onClick={() => logInServer()} variant="contained">
            Log In
          </Button>
          <Button onClick={() => navigate("/")} variant="contained">
            Cancel
          </Button>
          {/* <Button onClick={()=>resetInput()} variant="contained">Cancel</Button> */}
        </Stack>
      </div>
      {/* <button onClick={()=>{ 


    logInServer()
}
    }
>Log In</button> */}
      <p className="Login-message">{message}</p>
    </div>
  );
};
export default LogIn;
