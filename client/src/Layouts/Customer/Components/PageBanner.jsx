import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import pageBanner from "../Assets/page-banner.jpg";
export default function PageBanner({ title }) {
  return (
    <Box
      sx={{
        height: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${pageBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 900, color: "#ffffffba" }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Breadcrumbs
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#ffffffba",
            }}
            aria-label="breadcrumb"
          >
            <Link
              style={{
                fontWeight: 900,
                textDecoration: "none",
                color: "#ffffffba",
              }}
              to={"/"}
            >
              Home
            </Link>
            <Typography sx={{ color: "#ffffffba", fontWeight: 900 }}>
              {title}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
