import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Orders from "./Pages/Orders";
import Cart from "./Pages/Cart";
import Menus from "./Pages/Menus";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Profile from "./Pages/Profile";
import Context from "./Context/Context";
import SingleMenu from "./Pages/SingleMenu";
import CheckOut from "./Pages/CheckOut";
export default function CustomerRoutes() {
  return (
    <Context>
      <NavBar />
      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/Menus" element={<Menus />} />
          <Route exact path="/Menus/:id" element={<SingleMenu />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/checkOut" element={<CheckOut />} />
        </Routes>
      </Box>
      <Footer />
    </Context>
  );
}
