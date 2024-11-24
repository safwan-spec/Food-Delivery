import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import MenuContainer from "../Components/Menus/MenuContainer";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
export default function Menus() {
  const { categories, menus, getCategoriesAndProducts } =
    useContext(CustomerContext);

  useEffect(() => {
    getCategoriesAndProducts();
  }, []);
  console.log(menus);
  return (
    <Box>
      <Box>
        <PageBanner title="Menu" />
      </Box>
      <Box>
        <MenuContainer categories={categories} menus={menus} />
      </Box>
    </Box>
  );
}
