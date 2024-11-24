import { Box, Chip, Paper, Rating } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function GiveRating({ orderId }) {
  const { submitFeedback } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = useState({ ratings: "", feedback: "" });
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    console.log(formInfo);
    submitFeedback(orderId, formInfo);
    // setOpen(false);
  };
  return (
    <Box>
      <Chip
        onClick={handleClickOpen}
        label="Ratings"
        color="warning"
        component={Paper}
      />

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Rate your order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            submit your submit and rate your order
          </DialogContentText>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Rating
              size="large"
              name="ratings"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
                setFormInfo({ ...formInfo, [event.target.name]: newValue });
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            name="feedback"
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
            label="Feedback"
            fullWidth
            multiline
            rows={2}
            placeholder="type your feedback here"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
