import { Box, Button, Grid2, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import { useEffect } from "react";

export default function InsertForm({ setShow, selectedCategory, show }) {
  // console.log(selectedCategory);
  const { insertCategory, updateCategory } = useContext(AdminContext);
  const [formInfo, setFormInfo] = useState({ title: "", picture: null });
  const [formError, setFormError] = useState({ title: null, picture: null });

  useEffect(() => {
    if (selectedCategory) {
      setFormInfo(selectedCategory);
    }
  }, [selectedCategory]);
  const handleSubmit = () => {
    if (formInfo.title == "") {
      setFormError({ ...formError, title: "Please enter a title" });
    } else if (formInfo.picture == null) {
      setFormError({ ...formError, picture: "Please upload a picture" });
    } else {
      setFormError({ title: null, picture: null });
      const Data = new FormData();
      Data.append("title", formInfo.title);
      Data.append("picture", formInfo.picture);
      if (selectedCategory) {
        updateCategory(selectedCategory?._id, Data);
      } else {
        insertCategory(Data);
      }
      setFormInfo({ title: "", picture: null });
      setShow((prev) => !prev);
    }
  };
  return (
    <Paper sx={{ p: { xs: 2, sm: 2 } }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 5 }}>
            <TextField
              value={formInfo?.title}
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              helperText={formError.title && formError.title}
              error={!!formError.title}
              fullWidth
              label="Enter category title"
              name="title"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 5 }}>
            <TextField
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({
                  ...formInfo,
                  [e.target.name]: e.target.files[0],
                });
              }}
              helperText={formError.picture && formError.picture}
              error={!!formError.picture}
              fullWidth
              label="Upload category picture"
              name="picture"
              type="file"
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 2 }}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ p: { xs: 0, sm: 2 } }}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
}
