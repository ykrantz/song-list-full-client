import "./MessageNote.css";
import React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const MessageNote = ({ message, type }) => {
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2} justifyContent="center">
        {type && <Alert severity={type}>{message}</Alert>}
      </Stack>
    </div>
  );
};

export default MessageNote;
