import { Box, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export default function Counts({ counts }) {
  // console.log(counts);
  const { customers, categories, menus, orders } = counts;
  let countData = [
    {
      title: "Total Customers",
      icon: <GroupIcon color="primary" sx={{ fontSize: "40px" }} />,
      count: customers,
    },
    {
      title: "Total Categories",
      count: categories,
      icon: <CategoryIcon color="primary" sx={{ fontSize: "40px" }} />,
    },
    {
      title: "Total Menus",
      count: menus,
      icon: <MenuBookIcon color="primary" sx={{ fontSize: "40px" }} />,
    },
    {
      title: "Total Orders",
      count: orders,
      icon: <ShoppingCartIcon color="primary" sx={{ fontSize: "40px" }} />,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {countData?.map((count, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 3 }}>
            <Paper
              elevation={3}
              sx={{ p: 1, display: "flex", borderRight: "6px solid #1976d2" }}
            >
              <Box sx={{ p: 2, width: "100%" }}>
                <Typography sx={{ fontWeight: "600" }} variant="h5">
                  {count.count}
                </Typography>
                <Typography sx={{ fontWeight: "600" }} variant="subtitle">
                  {count.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {count.icon}
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
