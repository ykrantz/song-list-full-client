import "./MessageNote.css";
import React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularIndeterminate from "../CircularIndeterminate/CircularIndeterminate";
import { CircularProgress, Typography } from "@mui/material";

const MessageNote = ({ message, type }) => {
  return (
    <div>
      <Stack
        sx={{ width: "100%" }}
        spacing={2}
        justifyContent="center"
        display={"flex"}
      >
        {message === "Waiting for results from server" && (
          // <CircularIndeterminate />
          <Typography align="center">
            <CircularProgress />
          </Typography>
        )}
        {message && message !== "Waiting for results from server" && (
          <Alert severity={type}>{message}</Alert>
        )}
      </Stack>
    </div>
  );
};

export default MessageNote;
