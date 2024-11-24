import React from "react";
import bannerBg from "../../Assets/about-3.jpg";
import { Box, Typography } from "@mui/material";
export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "50vh", sm: "80vh" },
        backgroundImage: `url(${bannerBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: "50vh", sm: "80vh" },
          backgroundColor: "#fdaa003d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h1">asdfghjk</Typography> */}
      </Box>
    </Box>
  );
}
