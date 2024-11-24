import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import about from "../../Assets/about-2.jpg";
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
export default function AboutContent() {
  return (
    <Box
      sx={{
        backgroundColor: "#fda50014",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 2, sm: 5 },
      }}
    >
      <Grid container spacing={2} sx={{ width: "90%" }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                px: 3,
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                width: "100%",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "900",
                }}
              >
                About <span style={{ color: "orange" }}>Us</span>
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                tempore laudantium? Facilis cupiditate, labore fugiat ipsum
                provident eius nam alias cumque corporis veritatis blanditiis
                quod ratione illum nihil ut maxime. Esse debitis corporis sunt
                inventore minus.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                tempore laudantium? Facilis cupiditate, labore fugiat ipsum
                provident eius nam alias cumque corporis veritatis blanditiis
                quod ratione illum nihil ut maxime. Esse debitis corporis sunt
                inventore minus.
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                tempore laudantium? Facilis cupiditate, labore fugiat ipsum
                provident eius nam alias cumque corporis veritatis blanditiis
                quod ratione illum nihil ut maxime. Esse debitis corporis sunt
                inventore minus.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} sx={{ p: 3 }}>
          <Box
            sx={{
              width: "100%",
              backgroundImage: `url(${about})`,
              height: { xs: "40vh", sm: "60vh" },
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
