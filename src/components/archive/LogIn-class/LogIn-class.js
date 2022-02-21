import { useState } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";

import "./LogIn.css";
// for login menue
const LogINClass = () => {
  const navigate = useNavigate();

  const logInToServer = async (username, password) => {
    const res = await fetch("http://localhost:3008/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logInDetials,
      }),
    });
    const data = await res.json();
    console.log(data);
    // accses
    localStorage.userToken = JSON.stringify(data.userToken);

    navigate("/");
  };

  const [logInDetials, setLogInDetials] = useState({});
  // to call server
  const callServerWithToken = () => {};
  const tokenToServer = JSON.parse(localStorage.userToken);

  const getSongs = async (username, password) => {
    const res = await fetch("http://localhost:3008/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // TOFOX:
        atouti: `bearar ${localStorage.getToken}`,
      },
      body: JSON.stringify({
        logInDetials,
      }),
    });
    const data = await res.json();
    console.log(data);
    // accses
    localStorage.userToken = JSON.stringify(data.userToken);
  };

  return (
    <>
      <input
        type="text"
        onInput={(e) => setLogInDetials({ username: e.target.value })}
        value={logInDetials.name}
        placeholder="user name"
      ></input>
      <input
        type="text"
        onInput={(e) => setLogInDetials({ password: e.target.value })}
        value={logInDetials.name}
        placeholder="password"
      ></input>
    </>
  );
};

export default LogINClass;
