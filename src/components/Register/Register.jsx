import "./Register.css";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";

import React, { useContext, useRef } from "react";
import { useState } from "react/cjs/react.development";
import handleUser from "../../context/handleUser";
import BackToHome from "../BackToHome/BackToHome";

const Register = () => {
  // const userName=useRef()
  // const password=useRef()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [user,setUser]=useState({})
  const { currentUser, setCurrentUser } = useContext(handleUser);
  const registerInServer = async () => {
    //  await   setUser({username:userName.current.value, password:password.current.value })
    if (userName === "" || password === "") {
      alert(`You didnt enter user name/password`);
      return;
    }
    const ans = await fetch("http://localhost:3008/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    });
    const data = await ans.json();
    // console.log(data);

    setCurrentUser({ username: userName, password: password });
    localStorage.currentUser = JSON.stringify(userName);
    localStorage.accessToken = JSON.stringify(data.accessToken);

    console.log("registered in server");
    console.log(data.accessToken);
    navigate("/");
  };
  // const resetInput=()=>{
  //   setUserName("")
  //   setPassword("")

  // }
  // console.log(user);
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
            {/* <TextField  value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" placeholder="password" label="password" variant="outlined" /> */}
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
      <div className="Register-buttons">
        <Stack spacing={2} direction="row">
          <Button onClick={() => registerInServer()} variant="contained">
            Register
          </Button>
          {/* <Button onClick={()=>resetInput()} variant="contained">Cancel</Button> */}
          <Button onClick={() => navigate("/")} variant="contained">
            Cancel
          </Button>
        </Stack>
      </div>
      {/* <button onClick={()=>{ 
    registerInServer()
}
    }
>register</button> */}
    </div>
  );
};
export default Register;
