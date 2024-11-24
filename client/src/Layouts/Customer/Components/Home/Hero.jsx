import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import heroBg from "../../Assets/hero-bg.jpg";
export default function Hero() {
  return (
    <Box
      sx={{
        height: { xs: "50vh", sm: "90vh" },
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid2 container>
        <Grid2
          item
          size={9}
          sx={{
            padding: { xs: 1, sm: 5 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "50vh", sm: "90vh" },
            // backgroundColor: "red",
          }}
        >
          <Box sx={{ p: 5, width: "100%" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#ffffffb8",
                fontSize: { xs: "30px", sm: "90px" },
              }}
            >
              Welcome to{" "}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#ffffffb8",
                fontSize: { xs: "24px", sm: "60px" },
              }}
            >
              Online Food Delivery
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#ffffffb8",
                fontSize: { xs: "30px", sm: "90px" },
              }}
            >
              Website
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: "#ffffffb8",
                fontSize: { xs: "14px" },
              }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
              doloribus?
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
