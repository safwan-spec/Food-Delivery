import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
export default function Logout({ open }) {
  const { adminLogout } = useContext(AdminContext);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    handleClose();
    adminLogout();
  };
  return (
    <div>
      <ListItem
        onClick={handleClickOpen}
        disablePadding
        sx={{
          display: "block",
          backgroundColor: "#1976d2",
          // borderRadius:  "20px",
        }}
      >
        <ListItemButton
          sx={[
            {
              minHeight: 48,
              px: 2.5,
            },
            open
              ? {
                  justifyContent: "initial",
                }
              : {
                  justifyContent: "center",
                },
          ]}
        >
          <ListItemIcon
            sx={[
              {
                minWidth: 0,
                justifyContent: "center",
                color: "white",
              },
              open
                ? {
                    mr: 3,
                  }
                : {
                    mr: "auto",
                  },
            ]}
          >
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Logout
              </Typography>
            }
            sx={[
              open
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  },
            ]}
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        fullWidth
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attempt to log out!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, want to log out from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleLogout} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
