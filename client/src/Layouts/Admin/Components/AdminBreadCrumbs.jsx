import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { Link } from "react-router-dom";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function AdminBreadCrumbs({
  isSecond,
  secondTitle,
  secondPath,
  isThird,
  thirdTitle,
}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            color: "black",
            textDecoration: "none",
          }}
          to={"/Admin/Dashboard"}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        {isSecond && (
          <Link
            to={secondPath}
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              textDecoration: "none",
            }}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {secondTitle}
          </Link>
        )}
        {isThird && (
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {thirdTitle}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
