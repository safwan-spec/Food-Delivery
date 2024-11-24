import React from "react";
import { Box } from "@mui/material";
import Hero from "../Components/Home/Hero";
import AboutContent from "../Components/Home/AboutContent";
import Banner from "../Components/Home/Banner";
export default function Home() {
  return (
    <Box>
      <Box>
        <Hero />
      </Box>
      <Box>
        <AboutContent />
      </Box>
      <Box>
        <Banner />
      </Box>
    </Box>
  );
}
