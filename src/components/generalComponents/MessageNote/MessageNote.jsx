import "./MessageNote.css";
import React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import { makeStyles } from "@material-ui/core/styles";
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
// const useStyles = makeStyles({
//   cookieAlert: {
//     "& .MuiAlert-font": {
//       fontSize: "5",
//     },
//   },
// });
const MessageNote = ({ message, type }) => {
  // const classes = useStyles();

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2} justifyContent="center">
        {type && (
          <Alert
            // className={classes.cookieAlert}
            // sx={{ fontSize: "10px" }}
            severity={type}
          >
            {message}
          </Alert>
        )}
      </Stack>
    </div>
  );
};

export default MessageNote;
