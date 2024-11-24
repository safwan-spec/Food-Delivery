import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Grid2, Typography } from "@mui/material";
import MenuCard from "./MenuCard";

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
export default function RelatedMenus({ menus }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "600" }}
        variant="overline"
      >
        Related menus
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <Grid2 container spacing={2}>
              {menus?.map((menu, index) => (
                <Grid size={3} key={index}>
                  <MenuCard menuInfo={menu} />
                </Grid>
              ))}
            </Grid2>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
