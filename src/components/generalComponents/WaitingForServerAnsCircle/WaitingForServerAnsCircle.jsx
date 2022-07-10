import { CircularProgress, Typography } from "@mui/material";
import React from "react";

const WaitingForServerAnsCircle = () => {
  return (
    <div>
      <Typography
        align="center"
        sx={{
          marginTop: "5vh",
        }}
      >
        <CircularProgress />
      </Typography>
    </div>
  );
};

export default WaitingForServerAnsCircle;
