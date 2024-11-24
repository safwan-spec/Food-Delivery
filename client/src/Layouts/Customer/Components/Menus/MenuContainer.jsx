import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MenuCard from "./MenuCard";
import { useState } from "react";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export default function MenuContainer({ menus, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredMenus, setFilteredMenus] = useState([]);
  useEffect(() => {
    const filterMenus = () => {
      var allMenus = menus;
      if (search) {
        allMenus = menus?.filter((menu) =>
          menu?.title?.toLowerCase().includes(search?.toLowerCase())
        );
      } else if (selectedCategory != "All") {
        allMenus = menus?.filter(
          (menu) => menu?.category?._id === selectedCategory
        );
      } else {
        allMenus = menus;
      }
      setFilteredMenus(allMenus);
    };
    filterMenus();
  }, [search, selectedCategory, menus]);
  console.log(categories);
  console.log(menus);
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <TextField
            label="search products here..."
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter by category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Filter by category"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {categories?.map((category, index) => (
                <MenuItem key={index} value={category?._id}>
                  {category?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
  container
  spacing={2} // Adds spacing between items
  justifyContent="center"
  sx={{
    display: "flex",
    gap: 2, // Adjust the gap between the items
  }}
>
  {filteredMenus?.map((menu, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "430px", // Set a fixed height for each card
          width: "300px", // Make sure it takes full width of the grid item
          boxSizing: "border-box",
          padding: 2,
        }}
      >
        <MenuCard menuInfo={menu} />
      </Box>
    </Grid>
  ))}
</Grid>
      </Grid>
    </Box>
  );
}
