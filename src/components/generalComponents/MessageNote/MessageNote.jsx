import "./MessageNote.css";
import React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// export default function BasicAlerts() {
//   return (
//     <Stack sx={{ width: '100%' }} spacing={2}>
//       <Alert severity="error">This is an error alert — check it out!</Alert>
//       <Alert severity="warning">This is a warning alert — check it out!</Alert>
//       <Alert severity="info">This is an info alert — check it out!</Alert>
//       <Alert severity="success">This is a success alert — check it out!</Alert>
//     </Stack>
//   );
// }

const MessageNote = ({ message, type }) => {
  console.log({ type }, 35);
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={type ? type : ""}>{message}</Alert>
        {/* <Alert severity={type}>{message}</Alert> */}
        {/* <Alert severity="warning">This is a warning alert — check it out!</Alert> */}
        {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
        {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
      </Stack>
      {/* <span className={isEror ? "MessageNote-eror" : "MessageNote-normal"}>
      {message}
    </span> */}
    </div>
  );
};

export default MessageNote;
