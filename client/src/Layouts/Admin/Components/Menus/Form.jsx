import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../../Context/Context";
import { useEffect } from "react";

export default function Form({ categories, singleMenu, host }) {
  const { insertMenu, updateMenu } = useContext(AdminContext);
  const [formInfo, setFormInfo] = useState({
    title: "",
    picture: null,
    description: "",
    category: null,
    price: "",
    foodType: null,
    servings: "",
    status: null,
  });
  const [formError, setFormError] = useState({
    title: null,
    picture: null,
    description: null,
    category: null,
    price: null,
    foodType: null,
    servings: null,
  });
  useEffect(() => {
    if (singleMenu) {
      setFormInfo(singleMenu);
    } else {
      setFormInfo({
        title: "",
        picture: null,
        description: "",
        category: null,
        price: "",
        foodType: null,
        servings: "",
        status: null,
      });
    }
  }, [singleMenu]);

  const handleSubmit = () => {
    if (formInfo?.title == "") {
      setFormError({ ...formError, title: "Please enter the title!" });
    } else if (formInfo?.description == "") {
      setFormError({
        ...formError,
        description: "Please enter the description!",
      });
    } else if (formInfo?.picture == null) {
      setFormError({ ...formError, picture: "Please upload a picture!" });
    } else if (formInfo?.foodType == null) {
      setFormError({ ...formError, foodType: "Please select a food type!" });
    } else if (formInfo?.category == null) {
      setFormError({ ...formError, category: "Please select a category!" });
    } else if (formInfo?.price == "") {
      setFormError({ ...formError, price: "Please enter the price!" });
    } else if (formInfo?.servings == "") {
      setFormError({ ...formError, servings: "Please enter the servings!" });
    } else {
      const Data = new FormData();
      Data.append("title", formInfo?.title);
      Data.append("picture", formInfo?.picture);
      Data.append("description", formInfo?.description);
      Data.append("foodType", formInfo?.foodType);
      Data.append("category", formInfo?.category);
      Data.append("price", formInfo?.price);
      Data.append("servings", formInfo?.servings);
      if (singleMenu) {
        Data.append("status", formInfo?.status);
        updateMenu(singleMenu?._id, Data);
      } else {
        insertMenu(Data);
      }
    }
  };
  //   console.log(formInfo);
  return (
    <Box>
      <Paper elevation={2} sx={{ flexGrow: 1, p: 3 }}>
        <Grid2 container spacing={2}>
          {singleMenu && (
            <Grid2
              item
              size={{ xs: 12, sm: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                variant="square"
                src={`${host}/uploads/admin/${singleMenu?.picture}`}
                alt="picture"
                sx={{ width: 150, height: 150 }}
              />
            </Grid2>
          )}
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Menu Title"
              name="title"
              fullWidth
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo?.title}
              helperText={formError.title && formError.title}
              error={!!formError.title}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Upload menu picture"
              name="picture"
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({
                  ...formInfo,
                  [e.target.name]: e.target.files[0],
                });
              }}
              //   value={formInfo?.title}
              helperText={formError.picture && formError.picture}
              error={!!formError.picture}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 12 }}>
            <TextField
              label="Description"
              name="description"
              //   type="file"
              //   InputLabelProps={{ shrink: true }}
              multiline
              rows={2}
              fullWidth
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo?.description}
              helperText={formError.description && formError.description}
              error={!!formError.description}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formInfo?.foodType}
                label="Food Type"
                name="foodType"
                onChange={(e) => {
                  setFormError({ ...formError, [e.target.name]: null });
                  setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
                }}
                helperText={formError.foodType && formError.foodType}
                error={!!formError.foodType}
              >
                <MenuItem value={"Veg"}>Veg</MenuItem>
                <MenuItem value={"Non Veg"}>Non Veg</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formInfo?.category}
                label="Category"
                name="category"
                onChange={(e) => {
                  setFormError({ ...formError, [e.target.name]: null });
                  setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
                }}
                helperText={formError.category && formError.category}
                error={!!formError.category}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category?._id}>
                    {category?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo?.price}
              helperText={formError.price && formError.price}
              error={!!formError.price}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Servings"
              name="servings"
              type="number"
              fullWidth
              onChange={(e) => {
                setFormError({ ...formError, [e.target.name]: null });
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
              }}
              value={formInfo?.servings}
              helperText={formError.servings && formError.servings}
              error={!!formError.servings}
            />
          </Grid2>
          {singleMenu && (
            <Grid2 item size={{ xs: 12, sm: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formInfo?.status}
                  label="Status"
                  name="status"
                  onChange={(e) => {
                    setFormInfo({
                      ...formInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          )}
          <Grid2 item size={{ xs: 12, sm: 12 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ p: 1 }}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
}
