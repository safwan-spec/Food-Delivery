import { Box, Button } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import ViewMenus from "../Components/Menus/ViewMenus";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";

export default function Menus() {
  const { getMenus, menus, host } = useContext(AdminContext);

  useEffect(() => {
    getMenus();
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <AdminBreadCrumbs isThird={true} thirdTitle={"Menus"} />
        </Box>
        <Box>
          <Button component={Link} to={`/Admin/MenuForm`} variant="contained">
            Insert New
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <ViewMenus menus={menus} host={host} />
      </Box>
    </Box>
  );
}
