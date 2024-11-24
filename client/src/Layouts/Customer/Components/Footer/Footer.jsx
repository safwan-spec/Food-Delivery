import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { colors, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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

export default function Footer() {
  return (
    <Box
      sx={{ backgroundColor: "#f6d993", p: { xs: 3, sm: 8 }, pt: { xs: 4 } }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box>
            <Typography
              variant="overline"
              sx={{ fontWeight: 900, color: "#b1793d", fontSize: "30px" }}
            >
              Logo
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#b1793d" }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores, labore.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography
            variant="overline"
            sx={{ fontWeight: 600, color: "#b1793d", fontSize: "20px" }}
          >
            Quick Links
          </Typography>
          <Box>
            <ListItem component={Link} to={"/"} sx={{ color: "#b1793d" }}>
              Home
            </ListItem>
            <ListItem component={Link} to={"/About"} sx={{ color: "#b1793d" }}>
              About
            </ListItem>
            <ListItem
              component={Link}
              to={"/Contact"}
              sx={{ color: "#b1793d" }}
            >
              Contact
            </ListItem>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography
            variant="overline"
            sx={{ fontWeight: 600, color: "#b1793d", fontSize: "20px" }}
          >
            More Links
          </Typography>
          <Box>
            <ListItem component={Link} to={"/Orders"} sx={{ color: "#b1793d" }}>
              Orders
            </ListItem>
            <ListItem component={Link} to={"/Cart"} sx={{ color: "#b1793d" }}>
              Cart
            </ListItem>
            <ListItem
              component={Link}
              to={"/Profile"}
              sx={{ color: "#b1793d" }}
            >
              Profile
            </ListItem>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
