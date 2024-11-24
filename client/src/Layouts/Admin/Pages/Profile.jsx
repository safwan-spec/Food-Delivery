import { Box } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";

export default function Profile() {
  return (
    <Box>
      <Box>
        <AdminBreadCrumbs isThird={true} thirdTitle={"Profile"} />
      </Box>
      Profile
    </Box>
  );
}
