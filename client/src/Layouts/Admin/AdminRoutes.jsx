import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import Menus from "./Pages/Menus";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import Feedbacks from "./Pages/Feedbacks";
import SideBar from "./Components/NavBar/SideBar";
import Customers from "./Pages/Customers";
import Context from "./Context/Context";
import MenuForm from "./Pages/MenuForm";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function AdminRoutes() {
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <Context>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {pathname != "/admin" &&
          pathname != "/admin/" &&
          pathname != "/Admin" &&
          pathname != "/Admin/" && <SideBar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p:
              pathname != "/admin" &&
              pathname != "/admin/" &&
              pathname != "/Admin" &&
              pathname != "/Admin/"
                ? 3
                : 0,
          }}
        >
          {pathname != "/admin" &&
            pathname != "/admin/" &&
            pathname != "/Admin" &&
            pathname != "/Admin/" && <DrawerHeader />}

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Customers" element={<Customers />} />
            <Route exact path="/Categories" element={<Categories />} />
            <Route exact path="/Menus" element={<Menus />} />
            <Route exact path="/MenuForm" element={<MenuForm />} />
            <Route exact path="/updateMenu/:id" element={<MenuForm />} />
            <Route exact path="/Orders" element={<Orders />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/Feedbacks" element={<Feedbacks />} />
          </Routes>
        </Box>
      </Box>
    </Context>
  );
}
